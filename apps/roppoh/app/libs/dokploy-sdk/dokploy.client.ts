import { cache } from "react";
import { newDokployClient } from "./dokploy";

export const getDokployClient = cache(() => newDokployClient());
