// FYI: https://www.better-auth.com/docs/integrations/remix#create-api-route

import { auth } from "@/lib/betterAuth/auth.server";
import type { Route } from "./+types/auth";

export async function loader({ request }: Route.LoaderArgs) {
  return auth.handler(request);
}

export async function action({ request }: Route.ActionArgs) {
  return auth.handler(request);
}
