import type { postTokenApiRouteType } from "@/app/api/token/route";
import { hc } from "hono/client";

export const apiClient = hc<postTokenApiRouteType>("/");
