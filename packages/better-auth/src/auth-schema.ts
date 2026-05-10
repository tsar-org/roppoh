import { relations, sql } from "drizzle-orm";
import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  banExpires: integer("ban_expires", { mode: "timestamp_ms" }),
  banReason: text("ban_reason"),
  banned: integer("banned", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).default(false).notNull(),
  id: text("id").primaryKey(),
  image: text("image"),
  name: text("name").notNull(),
  role: text("role"),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" })
    .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = sqliteTable(
  "session",
  {
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    id: text("id").primaryKey(),
    impersonatedBy: text("impersonated_by"),
    ipAddress: text("ip_address"),
    token: text("token").notNull().unique(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = sqliteTable(
  "account",
  {
    accessToken: text("access_token"),
    accessTokenExpiresAt: integer("access_token_expires_at", {
      mode: "timestamp_ms",
    }),
    accountId: text("account_id").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    id: text("id").primaryKey(),
    idToken: text("id_token"),
    password: text("password"),
    providerId: text("provider_id").notNull(),
    refreshToken: text("refresh_token"),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", {
      mode: "timestamp_ms",
    }),
    scope: text("scope"),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = sqliteTable(
  "verification",
  {
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp_ms" }).notNull(),
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp_ms" })
      .default(sql`(cast(unixepoch('subsecond') * 1000 as integer))`)
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    value: text("value").notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const jwks = sqliteTable("jwks", {
  createdAt: integer("created_at", { mode: "timestamp_ms" }).notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }),
  id: text("id").primaryKey(),
  privateKey: text("private_key").notNull(),
  publicKey: text("public_key").notNull(),
});

export const oauthClient = sqliteTable("oauth_client", {
  clientId: text("client_id").notNull().unique(),
  clientSecret: text("client_secret"),
  contacts: text("contacts", { mode: "json" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }),
  disabled: integer("disabled", { mode: "boolean" }).default(false),
  enableEndSession: integer("enable_end_session", { mode: "boolean" }),
  grantTypes: text("grant_types", { mode: "json" }),
  icon: text("icon"),
  id: text("id").primaryKey(),
  metadata: text("metadata", { mode: "json" }),
  name: text("name"),
  policy: text("policy"),
  postLogoutRedirectUris: text("post_logout_redirect_uris", { mode: "json" }),
  public: integer("public", { mode: "boolean" }),
  redirectUris: text("redirect_uris", { mode: "json" }).notNull(),
  referenceId: text("reference_id"),
  requirePKCE: integer("require_pkce", { mode: "boolean" }),
  responseTypes: text("response_types", { mode: "json" }),
  scopes: text("scopes", { mode: "json" }),
  skipConsent: integer("skip_consent", { mode: "boolean" }),
  softwareId: text("software_id"),
  softwareStatement: text("software_statement"),
  softwareVersion: text("software_version"),
  subjectType: text("subject_type"),
  tokenEndpointAuthMethod: text("token_endpoint_auth_method"),
  tos: text("tos"),
  type: text("type"),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }),
  uri: text("uri"),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
});

export const oauthRefreshToken = sqliteTable("oauth_refresh_token", {
  authTime: integer("auth_time", { mode: "timestamp_ms" }),
  clientId: text("client_id")
    .notNull()
    .references(() => oauthClient.clientId, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }),
  id: text("id").primaryKey(),
  referenceId: text("reference_id"),
  revoked: integer("revoked", { mode: "timestamp_ms" }),
  scopes: text("scopes", { mode: "json" }).notNull(),
  sessionId: text("session_id").references(() => session.id, {
    onDelete: "set null",
  }),
  token: text("token").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const oauthAccessToken = sqliteTable("oauth_access_token", {
  clientId: text("client_id")
    .notNull()
    .references(() => oauthClient.clientId, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }),
  expiresAt: integer("expires_at", { mode: "timestamp_ms" }),
  id: text("id").primaryKey(),
  referenceId: text("reference_id"),
  refreshId: text("refresh_id").references(() => oauthRefreshToken.id, {
    onDelete: "cascade",
  }),
  scopes: text("scopes", { mode: "json" }).notNull(),
  sessionId: text("session_id").references(() => session.id, {
    onDelete: "set null",
  }),
  token: text("token").unique(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
});

export const oauthConsent = sqliteTable("oauth_consent", {
  clientId: text("client_id")
    .notNull()
    .references(() => oauthClient.clientId, { onDelete: "cascade" }),
  createdAt: integer("created_at", { mode: "timestamp_ms" }),
  id: text("id").primaryKey(),
  referenceId: text("reference_id"),
  scopes: text("scopes", { mode: "json" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp_ms" }),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
});

export const passkey = sqliteTable(
  "passkey",
  {
    aaguid: text("aaguid"),
    backedUp: integer("backed_up", { mode: "boolean" }).notNull(),
    counter: integer("counter").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" }),
    credentialID: text("credential_id").notNull(),
    deviceType: text("device_type").notNull(),
    id: text("id").primaryKey(),
    name: text("name"),
    publicKey: text("public_key").notNull(),
    transports: text("transports"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("passkey_userId_idx").on(table.userId),
    index("passkey_credentialID_idx").on(table.credentialID),
  ],
);

export const userRelations = relations(user, ({ many }) => ({
  accounts: many(account),
  oauthAccessTokens: many(oauthAccessToken),
  oauthClients: many(oauthClient),
  oauthConsents: many(oauthConsent),
  oauthRefreshTokens: many(oauthRefreshToken),
  passkeys: many(passkey),
  sessions: many(session),
}));

export const sessionRelations = relations(session, ({ one, many }) => ({
  oauthAccessTokens: many(oauthAccessToken),
  oauthRefreshTokens: many(oauthRefreshToken),
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const oauthClientRelations = relations(oauthClient, ({ one, many }) => ({
  oauthAccessTokens: many(oauthAccessToken),
  oauthConsents: many(oauthConsent),
  oauthRefreshTokens: many(oauthRefreshToken),
  user: one(user, {
    fields: [oauthClient.userId],
    references: [user.id],
  }),
}));

export const oauthRefreshTokenRelations = relations(oauthRefreshToken, ({ one, many }) => ({
  oauthAccessTokens: many(oauthAccessToken),
  oauthClient: one(oauthClient, {
    fields: [oauthRefreshToken.clientId],
    references: [oauthClient.clientId],
  }),
  session: one(session, {
    fields: [oauthRefreshToken.sessionId],
    references: [session.id],
  }),
  user: one(user, {
    fields: [oauthRefreshToken.userId],
    references: [user.id],
  }),
}));

export const oauthAccessTokenRelations = relations(oauthAccessToken, ({ one }) => ({
  oauthClient: one(oauthClient, {
    fields: [oauthAccessToken.clientId],
    references: [oauthClient.clientId],
  }),
  oauthRefreshToken: one(oauthRefreshToken, {
    fields: [oauthAccessToken.refreshId],
    references: [oauthRefreshToken.id],
  }),
  session: one(session, {
    fields: [oauthAccessToken.sessionId],
    references: [session.id],
  }),
  user: one(user, {
    fields: [oauthAccessToken.userId],
    references: [user.id],
  }),
}));

export const oauthConsentRelations = relations(oauthConsent, ({ one }) => ({
  oauthClient: one(oauthClient, {
    fields: [oauthConsent.clientId],
    references: [oauthClient.clientId],
  }),
  user: one(user, {
    fields: [oauthConsent.userId],
    references: [user.id],
  }),
}));

export const passkeyRelations = relations(passkey, ({ one }) => ({
  user: one(user, {
    fields: [passkey.userId],
    references: [user.id],
  }),
}));
