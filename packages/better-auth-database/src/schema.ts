import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  createdAt: integer({ mode: "timestamp" }).notNull(),
  email: text().notNull(),
  emailVerified: integer().notNull(),
  id: text().primaryKey().notNull(),
  image: text(),
  name: text().notNull(),
  updatedAt: integer({ mode: "timestamp" }).notNull(),
});

export const session = sqliteTable("session", {
  createdAt: integer({ mode: "timestamp" }).notNull(),
  expiresAt: integer({ mode: "timestamp" }).notNull(),
  id: text().primaryKey().notNull(),
  ipAddress: text(),
  token: text().notNull(),
  updatedAt: integer({ mode: "timestamp" }).notNull(),
  userAgent: text(),
  userId: text()
    .notNull()
    .references(() => user.id),
});

export const account = sqliteTable("account", {
  accessToken: text(),
  accessTokenExpiresAt: integer({ mode: "timestamp" }),
  accountId: text().notNull(),
  createdAt: integer({ mode: "timestamp" }).notNull(),
  id: text().primaryKey().notNull(),
  idToken: text(),
  password: text(),
  providerId: text().notNull(),
  refreshToken: text(),
  refreshTokenExpiresAt: integer({ mode: "timestamp" }),
  scope: text(),
  updatedAt: integer({ mode: "timestamp" }).notNull(),
  userId: text()
    .notNull()
    .references(() => user.id),
});

export const verification = sqliteTable("verification", {
  createdAt: integer({ mode: "timestamp" }),
  expiresAt: integer({ mode: "timestamp" }).notNull(),
  id: text().primaryKey().notNull(),
  identifier: text().notNull(),
  updatedAt: integer({ mode: "timestamp" }),
  value: text().notNull(),
});

export const schemas = {
  account,
  session,
  user,
  verification,
};
