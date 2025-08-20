import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { drizzle } from "drizzle-orm/d1";
import { schemas } from "./schema";
// biome-ignore lint/suspicious/noExplicitAny: to allow any type for drizzle
export const createD1Database = (d1Database) => {
  const db = drizzle(d1Database);
  return drizzleAdapter(db, {
    provider: "sqlite",
    schema: { ...schemas },
  });
};
