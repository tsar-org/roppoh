import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./router";

import "./global.css";

// biome-ignore lint/style/noNonNullAssertion: not null
createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
