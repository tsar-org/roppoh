export declare const user: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
  name: "user";
  schema: undefined;
  columns: {
    id: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "id";
        tableName: "user";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    name: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "name";
        tableName: "user";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    email: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "email";
        tableName: "user";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    emailVerified: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "emailVerified";
        tableName: "user";
        dataType: "number";
        columnType: "SQLiteInteger";
        data: number;
        driverParam: number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
    image: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "image";
        tableName: "user";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "createdAt";
        tableName: "user";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
    updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "updatedAt";
        tableName: "user";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
  };
  dialect: "sqlite";
}>;
export declare const session: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
  name: "session";
  schema: undefined;
  columns: {
    id: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "id";
        tableName: "session";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    expiresAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "expiresAt";
        tableName: "session";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
    token: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "token";
        tableName: "session";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "createdAt";
        tableName: "session";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
    updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "updatedAt";
        tableName: "session";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
    ipAddress: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "ipAddress";
        tableName: "session";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    userAgent: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "userAgent";
        tableName: "session";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    userId: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "userId";
        tableName: "session";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
  };
  dialect: "sqlite";
}>;
export declare const account: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
  name: "account";
  schema: undefined;
  columns: {
    id: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "id";
        tableName: "account";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    accountId: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "accountId";
        tableName: "account";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    providerId: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "providerId";
        tableName: "account";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    userId: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "userId";
        tableName: "account";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    accessToken: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "accessToken";
        tableName: "account";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    refreshToken: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "refreshToken";
        tableName: "account";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    idToken: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "idToken";
        tableName: "account";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    accessTokenExpiresAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "accessTokenExpiresAt";
        tableName: "account";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
    refreshTokenExpiresAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "refreshTokenExpiresAt";
        tableName: "account";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
    scope: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "scope";
        tableName: "account";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    password: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "password";
        tableName: "account";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "createdAt";
        tableName: "account";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
    updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "updatedAt";
        tableName: "account";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
  };
  dialect: "sqlite";
}>;
export declare const verification: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
  name: "verification";
  schema: undefined;
  columns: {
    id: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "id";
        tableName: "verification";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    identifier: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "identifier";
        tableName: "verification";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    value: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "value";
        tableName: "verification";
        dataType: "string";
        columnType: "SQLiteText";
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {
        length: undefined;
      }
    >;
    expiresAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "expiresAt";
        tableName: "verification";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
    createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "createdAt";
        tableName: "verification";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
    updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
      {
        name: "updatedAt";
        tableName: "verification";
        dataType: "date";
        columnType: "SQLiteTimestamp";
        data: Date;
        driverParam: number;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        identity: undefined;
        generated: undefined;
      },
      {},
      {}
    >;
  };
  dialect: "sqlite";
}>;
export declare const schemas: {
  user: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "user";
    schema: undefined;
    columns: {
      id: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "id";
          tableName: "user";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: true;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      name: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "name";
          tableName: "user";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      email: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "email";
          tableName: "user";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      emailVerified: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "emailVerified";
          tableName: "user";
          dataType: "number";
          columnType: "SQLiteInteger";
          data: number;
          driverParam: number;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: undefined;
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {}
      >;
      image: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "image";
          tableName: "user";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: false;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "createdAt";
          tableName: "user";
          dataType: "date";
          columnType: "SQLiteTimestamp";
          data: Date;
          driverParam: number;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: undefined;
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {}
      >;
      updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "updatedAt";
          tableName: "user";
          dataType: "date";
          columnType: "SQLiteTimestamp";
          data: Date;
          driverParam: number;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: undefined;
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {}
      >;
    };
    dialect: "sqlite";
  }>;
  session: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "session";
    schema: undefined;
    columns: {
      id: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "id";
          tableName: "session";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: true;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      expiresAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "expiresAt";
          tableName: "session";
          dataType: "date";
          columnType: "SQLiteTimestamp";
          data: Date;
          driverParam: number;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: undefined;
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {}
      >;
      token: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "token";
          tableName: "session";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "createdAt";
          tableName: "session";
          dataType: "date";
          columnType: "SQLiteTimestamp";
          data: Date;
          driverParam: number;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: undefined;
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {}
      >;
      updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "updatedAt";
          tableName: "session";
          dataType: "date";
          columnType: "SQLiteTimestamp";
          data: Date;
          driverParam: number;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: undefined;
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {}
      >;
      ipAddress: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "ipAddress";
          tableName: "session";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: false;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      userAgent: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "userAgent";
          tableName: "session";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: false;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      userId: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "userId";
          tableName: "session";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
    };
    dialect: "sqlite";
  }>;
  account: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "account";
    schema: undefined;
    columns: {
      id: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "id";
          tableName: "account";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: true;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      accountId: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "accountId";
          tableName: "account";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      providerId: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "providerId";
          tableName: "account";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      userId: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "userId";
          tableName: "account";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      accessToken: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "accessToken";
          tableName: "account";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: false;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      refreshToken: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "refreshToken";
          tableName: "account";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: false;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      idToken: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "idToken";
          tableName: "account";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: false;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      accessTokenExpiresAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "accessTokenExpiresAt";
          tableName: "account";
          dataType: "date";
          columnType: "SQLiteTimestamp";
          data: Date;
          driverParam: number;
          notNull: false;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: undefined;
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {}
      >;
      refreshTokenExpiresAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "refreshTokenExpiresAt";
          tableName: "account";
          dataType: "date";
          columnType: "SQLiteTimestamp";
          data: Date;
          driverParam: number;
          notNull: false;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: undefined;
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {}
      >;
      scope: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "scope";
          tableName: "account";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: false;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      password: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "password";
          tableName: "account";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: false;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "createdAt";
          tableName: "account";
          dataType: "date";
          columnType: "SQLiteTimestamp";
          data: Date;
          driverParam: number;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: undefined;
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {}
      >;
      updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "updatedAt";
          tableName: "account";
          dataType: "date";
          columnType: "SQLiteTimestamp";
          data: Date;
          driverParam: number;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: undefined;
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {}
      >;
    };
    dialect: "sqlite";
  }>;
  verification: import("drizzle-orm/sqlite-core").SQLiteTableWithColumns<{
    name: "verification";
    schema: undefined;
    columns: {
      id: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "id";
          tableName: "verification";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: true;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      identifier: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "identifier";
          tableName: "verification";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      value: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "value";
          tableName: "verification";
          dataType: "string";
          columnType: "SQLiteText";
          data: string;
          driverParam: string;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: [string, ...string[]];
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {
          length: undefined;
        }
      >;
      expiresAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "expiresAt";
          tableName: "verification";
          dataType: "date";
          columnType: "SQLiteTimestamp";
          data: Date;
          driverParam: number;
          notNull: true;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: undefined;
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {}
      >;
      createdAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "createdAt";
          tableName: "verification";
          dataType: "date";
          columnType: "SQLiteTimestamp";
          data: Date;
          driverParam: number;
          notNull: false;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: undefined;
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {}
      >;
      updatedAt: import("drizzle-orm/sqlite-core").SQLiteColumn<
        {
          name: "updatedAt";
          tableName: "verification";
          dataType: "date";
          columnType: "SQLiteTimestamp";
          data: Date;
          driverParam: number;
          notNull: false;
          hasDefault: false;
          isPrimaryKey: false;
          isAutoincrement: false;
          hasRuntimeDefault: false;
          enumValues: undefined;
          baseColumn: never;
          identity: undefined;
          generated: undefined;
        },
        {},
        {}
      >;
    };
    dialect: "sqlite";
  }>;
};
