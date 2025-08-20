export declare const sessionRelations: import("drizzle-orm").Relations<
  "session",
  {
    user: import("drizzle-orm").One<"user", true>;
  }
>;
export declare const userRelations: import("drizzle-orm").Relations<
  "user",
  {
    sessions: import("drizzle-orm").Many<"session">;
    accounts: import("drizzle-orm").Many<"account">;
  }
>;
export declare const accountRelations: import("drizzle-orm").Relations<
  "account",
  {
    user: import("drizzle-orm").One<"user", true>;
  }
>;
