// This code is based on: https://github.com/better-auth/better-auth/tree/main/demo/oidc-client

import * as oauth from "oauth4webapi";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "./context";

const WEB_STORAGE_KEY = "oidc:auth";

type LoginParams = {
  scope?: string;
  redirectUri?: string;
};

export const useAuth = () => {
  const { accessToken, setAccessToken, idToken, setIdToken, setUser, client, user, as } =
    useContext(AuthContext);
  const [isHandlingRedirect, setHandlingRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (params?: LoginParams) => {
    if (!as) {
      return;
    }

    if (!client) {
      throw new Error("Client is not available");
    }

    const scope = params?.scope || "openid profile email";
    let redirectUri = params?.redirectUri;
    if (!redirectUri && Array.isArray(client.redirect_uris) && client.redirect_uris.length > 0) {
      redirectUri = client.redirect_uris[0]?.toString();
    }
    redirectUri = redirectUri || `${window.location.origin}/callback`;

    const code_challenge_method = "S256";
    const code_verifier = oauth.generateRandomCodeVerifier();
    const code_challenge = await oauth.calculatePKCECodeChallenge(code_verifier);

    const authorizationUrl = new URL(as.authorization_endpoint!);
    authorizationUrl.searchParams.set("client_id", client.client_id);
    authorizationUrl.searchParams.set("redirect_uri", redirectUri);
    authorizationUrl.searchParams.set("response_type", "code");
    authorizationUrl.searchParams.set("scope", scope);
    authorizationUrl.searchParams.set("code_challenge", code_challenge);
    authorizationUrl.searchParams.set("code_challenge_method", code_challenge_method);

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
    if (!as || !client || isHandlingRedirect) {
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
      const callbackParams = oauth.validateAuthResponse(as, client, currentUrl, state);

      const authorizationResponse = await oauth.authorizationCodeGrantRequest(
        as,
        client,
        oauth.None(),
        callbackParams,
        redirectUri,
        code_verifier,
      );

      const result = await oauth.processAuthorizationCodeResponse(
        as,
        client,
        authorizationResponse,
        {
          expectedNonce: nonce,
        },
      );

      const claims = oauth.getValidatedIdTokenClaims(result);
      if (!claims) {
        console.error("No ID token claims found");
        setHandlingRedirect(false);
        return;
      }

      setAccessToken(result.access_token);
      if (result.id_token) setIdToken(result.id_token);

      const userInfoResponse = await oauth.userInfoRequest(as, client, result.access_token);
      const userInfo = await oauth.processUserInfoResponse(
        as,
        client,
        claims.sub,
        userInfoResponse,
      );
      setUser(userInfo as Record<string, unknown>);

      window.history.replaceState({}, document.title, redirectUri || window.location.origin);
    } catch (error) {
      console.error("Error handling login redirect", error);
    } finally {
      setHandlingRedirect(false);
    }
  };

  const logout = () => {
    if (!as || !idToken) {
      return;
    }

    const endSessionUrl = new URL(as.end_session_endpoint!);
    endSessionUrl.searchParams.set("post_logout_redirect_uri", window.location.origin);
    endSessionUrl.searchParams.set("id_token_hint", idToken);

    setAccessToken(undefined);
    setIdToken(undefined);
    setUser(undefined);
    localStorage.removeItem("oidc:state");

    window.location.assign(endSessionUrl.toString());
  };

  useEffect(() => {
    const handleAuth = () => {
      if (window.location.search.includes("code=")) {
        void handleLoginRedirect()
          .catch((error) => {
            console.error("Failed to handle login redirect", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    };

    if (as && client) {
      handleAuth();
    }
  }, [window.location.search, as, client]);

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    accessToken,
    login,
    handleLoginRedirect,
    logout,
  };
};
