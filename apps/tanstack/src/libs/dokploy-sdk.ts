import { Dokploy } from "dokploy-sdk";

export const dokploClient = new Dokploy({
  apiKeyAuth:
    "fHXikAzzKPfCHEnHbnGAJXHlFvBFcnMWYgHqjZdkEzYBhAwhWXmUwQtwHKIZZBFk",
  serverURL: "http://localhost:3000/api/dokploy",
});
