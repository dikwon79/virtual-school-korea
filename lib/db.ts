import { PrismaClient } from "@prisma/client";

// const db = new PrismaClient();

// export default db;

// PrismaClient를 한 번만 생성해 재사용하기 위한 싱글톤 설정
let db: PrismaClient;

if (process.env.NODE_ENV === "production") {
  // Production 환경에서는 PrismaClient를 단 한 번만 생성
  db = new PrismaClient();
} else {
  // Development 환경에서는 Hot Reload를 고려하여 글로벌 변수로 관리
  if (!global.db) {
    global.db = new PrismaClient();
  }
  db = global.db;
}

export default db;
