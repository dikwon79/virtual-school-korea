import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.message.deleteMany();
  await prisma.chatRoom.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.liveStream.deleteMany();
  await prisma.sMSToken.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("password123", 10);

  const teacher = await prisma.user.create({
    data: {
      username: "teacher",
      email: "teacher@example.com",
      password,
    },
  });

  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: "생활한국어",
        price: 199,
        photo: "/images/lecture1.webp",
        description:
          "한국에서 반드시 필요한 생활 표현을 4주 만에 완성하는 실전 코스.",
        level: "중급",
        userId: teacher.id,
      },
    }),
    prisma.course.create({
      data: {
        title: "학생 한국어 말하기",
        price: 149,
        photo: "/images/lecture2.webp",
        description: "학생들을 위한 자연스러운 한국어 말하기 프로그램.",
        level: "초급",
        userId: teacher.id,
      },
    }),
    prisma.course.create({
      data: {
        title: "성인 한국어 말하기",
        price: 179,
        photo: "/images/lecture3.webp",
        description: "성인을 위한 비즈니스·일상 한국어 말하기 심화 과정.",
        level: "중급",
        userId: teacher.id,
      },
    }),
  ]);

  for (const course of courses) {
    await prisma.lesson.createMany({
      data: [
        { title: "오리엔테이션", videoUrl: "", order: 1, courseId: course.id },
        { title: "1주차 강의", videoUrl: "", order: 2, courseId: course.id },
        { title: "2주차 강의", videoUrl: "", order: 3, courseId: course.id },
        { title: "3주차 강의", videoUrl: "", order: 4, courseId: course.id },
      ],
    });
  }

  await prisma.payment.create({
    data: {
      amount: courses[0].price,
      method: "Credit Card",
      transaction_id: "TX-SEED-0001",
      start_date: new Date("2026-04-01T00:00:00Z"),
      end_date: new Date("2026-05-01T00:00:00Z"),
      courseId: courses[0].id,
      userId: teacher.id,
    },
  });

  console.log("✅ Seed complete:", {
    users: 1,
    courses: courses.length,
    lessons: courses.length * 4,
    payments: 1,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
