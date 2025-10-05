// FYI: https://www.better-auth.com/docs/integrations/remix#create-api-route

import type { Route } from "./+types/auth";

export async function loader({ request: req, context: ctx }: Route.LoaderArgs) {
  return ctx.dep.betterAuth.handler(req);
}

export async function action({ request: req, context: ctx }: Route.ActionArgs) {
  return ctx.dep.betterAuth.handler(req);
}
