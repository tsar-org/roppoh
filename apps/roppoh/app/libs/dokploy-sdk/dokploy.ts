import { Dokploy } from "dokploy-sdk";

export const newDokployClient = () =>
  new Dokploy({
    apiKeyAuth:
      "fHXikAzzKPfCHEnHbnGAJXHlFvBFcnMWYgHqjZdkEzYBhAwhWXmUwQtwHKIZZBFk",
    serverURL: `${import.meta.env.VITE_BASE_URL}/api/dokploy`,
  });
