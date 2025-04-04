import { PrismaClient } from "@prisma/client";

// const db = new PrismaClient();

// export default db;

let db: PrismaClient;

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  if (!global.db) {
    global.db = new PrismaClient();
  }
  db = global.db;
}

export default db;
