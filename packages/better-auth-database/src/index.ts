import type { BetterAuthOptions } from "better-auth";
import type { DBAdapter } from "better-auth/adapters";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import { schemas } from "./schema";

export const createD1Database = (
  d1Database: any,
): ((options: BetterAuthOptions) => DBAdapter<BetterAuthOptions>) => {
  const db = drizzle(d1Database);
  return drizzleAdapter(db, {
    provider: "sqlite",
    schema: { ...schemas },
  });
};
