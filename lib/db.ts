import { PrismaClient } from "@prisma/client";

// const db = new PrismaClient();

// export default db;

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export default db;
