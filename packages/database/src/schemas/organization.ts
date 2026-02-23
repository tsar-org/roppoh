/** biome-ignore-all assist/source/useSortedKeys: for reachability */
import { relations, sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
import { member } from "./member";

export const organization = sqliteTable(
  "organization",
  {
    id: text("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull(),
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`now()`)
      .notNull(),
  },
  (table) => [uniqueIndex("organization_slug_uidx").on(table.slug)],
);

export const organizationRelation = relations(organization, ({ many }) => ({
  members: many(member),
}));
