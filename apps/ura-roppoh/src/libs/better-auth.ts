import { admin, organization } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  basePath: "/api/v1/better-auth",
  baseURL: import.meta.env.VITE_ZUNPACHI_API_URL,
  fetchOptions: {
    credentials: "include",
  },
  plugins: [admin(), organization()],
});
