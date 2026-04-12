import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";

import { AuthProvider } from "./libs/oidc/provider";
import { router } from "./router";

import "./global.css";

// biome-ignore lint/style/noNonNullAssertion: not null
createRoot(document.getElementById("root")!).render(
  <AuthProvider
    issuer={import.meta.env.VITE_OIDC_ISSUER}
    clientId={import.meta.env.VITE_OIDC_CLIENT_ID}
  >
    <RouterProvider router={router} />
  </AuthProvider>,
);
