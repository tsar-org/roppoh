// This code is based on: https://github.com/better-auth/better-auth/tree/main/demo/oidc-client

import { RESET } from "jotai/utils";
import * as oauth from "oauth4webapi";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

import { OIDC_STORAGE_KEY, PKCE_CODE_CHALLENGE_METHOD } from "./constant";
import { AuthContext } from "./context";

const WEB_STORAGE_KEY = "oidc:auth";

type LoginParams = {
  scope?: string;
  redirectUri?: string;
};

export const useAuth = () => {
  const { stored, setStored, client, as } = useContext(AuthContext);
  const [isHandlingRedirect, setHandlingRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (params?: LoginParams) => {
    if (!as) {
      toast.error("Authentication server info dose not found.");
      return;
    }

    const scope = params?.scope || "openid profile email";
    let redirectUri = params?.redirectUri;
    if (!redirectUri && Array.isArray(client.redirect_uris) && client.redirect_uris.length > 0) {
      redirectUri = client.redirect_uris[0]?.toString();
    }
    redirectUri = redirectUri || `${window.location.origin}/callback`;

    const code_verifier = oauth.generateRandomCodeVerifier();
    const code_challenge = await oauth.calculatePKCECodeChallenge(code_verifier);

    const authorizationUrl = new URL(as.authorization_endpoint!);
    authorizationUrl.searchParams.set("client_id", client.client_id);
    authorizationUrl.searchParams.set("redirect_uri", redirectUri);
    authorizationUrl.searchParams.set("response_type", "code");
    authorizationUrl.searchParams.set("scope", scope);
    authorizationUrl.searchParams.set("code_challenge", code_challenge);
    authorizationUrl.searchParams.set("code_challenge_method", PKCE_CODE_CHALLENGE_METHOD);

    const state = oauth.generateRandomState();
    authorizationUrl.searchParams.set("state", state);

    const nonce = oauth.generateRandomNonce();
    authorizationUrl.searchParams.set("nonce", nonce);

    sessionStorage.setItem(
      WEB_STORAGE_KEY,
      JSON.stringify({ code_verifier, state, nonce, redirectUri }),
    );

    window.location.assign(authorizationUrl.toString());
  };

  const handleLoginRedirect = async () => {
    if (!as || isHandlingRedirect) {
      return;
    }

    setHandlingRedirect(true);

    const storage = sessionStorage.getItem(WEB_STORAGE_KEY);
    if (!storage) {
      console.error("No stored code_verifier and nonce found");
      setHandlingRedirect(false);
      return;
    }
    sessionStorage.removeItem(WEB_STORAGE_KEY);
    const { code_verifier, state, nonce, redirectUri } = JSON.parse(storage);

    try {
      const currentUrl = new URL(window.location.href);
      // throws on error in v3
      const params = oauth.validateAuthResponse(as, client, currentUrl, state);

      const authorizationResponse = await oauth.authorizationCodeGrantRequest(
        as,
        client,
        oauth.None(),
        params,
        redirectUri,
        code_verifier,
      );

      // throws WWWAuthenticateChallengeError / ResponseBodyError in v3
      const result = await oauth.processAuthorizationCodeResponse(
        as,
        client,
        authorizationResponse,
        {
          expectedNonce: nonce,
          requireIdToken: true,
        },
      );

      setStored((prev) => ({ ...prev, accessToken: result.access_token }));
      if (result.id_token) setStored((prev) => ({ ...prev, idToken: result.id_token }));

      const claims = oauth.getValidatedIdTokenClaims(result);
      if (!claims) {
        console.error("No ID token claims found");
        setHandlingRedirect(false);
        return;
      }

      // throws WWWAuthenticateChallengeError in v3
      const userInfoResponse = await oauth.userInfoRequest(as, client, result.access_token);
      const userInfo = await oauth.processUserInfoResponse(
        as,
        client,
        claims.sub,
        userInfoResponse,
      );
      setStored((prev) => ({ ...prev, user: userInfo as Record<string, unknown> }));

      window.history.replaceState({}, document.title, redirectUri || window.location.origin);
    } catch (error) {
      console.error("Error handling login redirect", error);
    } finally {
      setHandlingRedirect(false);
    }
  };

  const logout = () => {
    if (!as || !stored.idToken) return;

    const endSessionUrl = new URL(as.end_session_endpoint!);
    endSessionUrl.searchParams.set("post_logout_redirect_uri", window.location.origin);
    endSessionUrl.searchParams.set("id_token_hint", stored.idToken);

    setStored(RESET);
    localStorage.removeItem(OIDC_STORAGE_KEY);

    window.location.assign(endSessionUrl.toString());
  };

  useEffect(() => {
    if (!as || !client) return;

    if (!window.location.search.includes("code=")) {
      setIsLoading(false);
      return;
    }

    void handleLoginRedirect()
      .catch((error) => {
        console.error("Failed to handle login redirect", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [window.location.search, as, client]);

  return {
    user: stored.user,
    isAuthenticated: !!stored.user,
    isLoading,
    accessToken: stored.accessToken,
    login,
    handleLoginRedirect,
    logout,
  };
};
