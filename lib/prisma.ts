import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query", "info", "warn", "error"], // 디버깅을 위해 로그 활성화
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export default db;
