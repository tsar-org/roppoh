import type { Database as SqliteDatabase } from "better-sqlite3";
import type { Kyselify } from "drizzle-orm/kysely";
import { Kysely, SqliteDialect } from "kysely";
import { D1Dialect } from "kysely-d1";
import type { member, organization } from "./schemas";

export interface Database {
  organization: Kyselify<typeof organization>;
  member: Kyselify<typeof member>;
}

export type DatabaseClient = Kysely<Database>;

export const createDatabaseClient = (
  args:
    | {
        type: "d1";
        database: ConstructorParameters<typeof D1Dialect>[0]["database"];
      }
    | { type: "sqlite"; database: SqliteDatabase },
): DatabaseClient => {
  switch (args.type) {
    case "d1": {
      return new Kysely<Database>({
        dialect: new D1Dialect({ database: args.database }),
      });
    }
    case "sqlite": {
      return new Kysely<Database>({
        dialect: new SqliteDialect({ database: args.database }),
      });
    }
  }
};
