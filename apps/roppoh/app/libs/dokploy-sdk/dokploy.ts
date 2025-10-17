import { Dokploy } from "dokploy-sdk";

export const newDokployClient = () =>
  new Dokploy({
    serverURL: `${import.meta.env.VITE_BASE_URL}/api/dokploy`,
  });
