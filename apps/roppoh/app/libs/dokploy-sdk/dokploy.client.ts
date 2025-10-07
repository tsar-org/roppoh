import { Dokploy } from "dokploy-sdk";

console.log("url: " + import.meta.env.VITE_BASE_URL);

export const dokployClient = new Dokploy({
  apiKeyAuth:
    "fHXikAzzKPfCHEnHbnGAJXHlFvBFcnMWYgHqjZdkEzYBhAwhWXmUwQtwHKIZZBFk",
  serverURL: import.meta.env.VITE_BASE_URL + "/api/dokploy",
});
