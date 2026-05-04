import { useQuery } from "@tanstack/react-query";
import { useAtom } from "jotai/react";
import type { Client } from "oauth4webapi";
import { discoveryRequest, processDiscoveryResponse } from "oauth4webapi";

import { oidcStoredStateAtom } from "./constant";
import { AuthContext } from "./context";

interface Props {
  issuer: string;
  clientId: string;
  children: React.ReactNode;
}

export const AuthProvider = (props: Props) => {
  const client: Client = {
    client_id: props.clientId,
    token_endpoint_auth_method: "none",
    redirect_uris: [`${window.location.origin}/callback`],
  };

  const [stored, setStored] = useAtom(oidcStoredStateAtom);

  const { data: as } = useQuery({
    queryKey: ["oidc-discovery", props.issuer],
    queryFn: async () => {
      const issuerUrl = new URL(props.issuer);
      const response = await discoveryRequest(issuerUrl, { algorithm: "oidc" });
      return processDiscoveryResponse(issuerUrl, response);
    },
    enabled: !!props.issuer,
    staleTime: Infinity,
  });

  return (
    <AuthContext.Provider value={{ as, client, stored, setStored }}>
      {props.children}
    </AuthContext.Provider>
  );
};
