import * as jose from "jose";

interface IDTokenClaims {
  iss: string;
  sub: string;
  aud: string;
  auth_time?: number;
  preferred_username?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  picture?: string;
  guilds?: string[];
  [key: string]: unknown;
}

export async function generateIdToken(
  privateKey: CryptoKey,
  clientId: string,
  userId: string,
  userInfo: {
    username: string;
    discriminator: string | null;
    global_name: string | null;
    email?: string;
    email_verified?: boolean;
    avatar?: string | null;
  },
  issuer?: string,
): Promise<string> {
  let preferred_username = userInfo.username;
  if (userInfo.discriminator && userInfo.discriminator !== "0") {
    preferred_username += `#${userInfo.discriminator}`;
  }

  const displayName = userInfo.global_name ?? userInfo.username;

  const claims: IDTokenClaims = {
    aud: clientId,
    auth_time: Math.floor(Date.now() / 1000),
    email: userInfo.email,
    email_verified: userInfo.email_verified ?? false,
    iss: issuer || "https://oidc.example.com",
    name: displayName,
    preferred_username,
    sub: userId,
  };

  const token = await new jose.SignJWT(claims)
    .setProtectedHeader({ alg: "RS256", kid: "jwtRS256" })
    .setExpirationTime("1h")
    .setIssuedAt()
    .sign(privateKey);

  return token;
}
