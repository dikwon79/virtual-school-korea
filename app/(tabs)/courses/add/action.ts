"use server";

import { z } from "zod";
import fs from "fs/promises";
import path from "path"; // 📌 파일 경로 설정을 위한 모듈
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

// 📌 Zod 스키마 수정
const courseSchema = z.object({
  photo: z.string({ required_error: "Photo must be a string (file path)" }), // 📌 파일 경로 저장
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  price: z.coerce.number({ required_error: "Price is required" }),
  level: z.string({ required_error: "Level" }),
  lessons: z
    .array(
      z.object({
        title: z.string({ required_error: "lesson title is required" }),
        videoUrl: z.string().url({ message: "Invalid video URL" }),
      })
    )
    .min(1, { message: "At least one lesson is required" }),
});

export async function uploadProduct(_: any, formData: FormData) {
  const lessonCount = parseInt(formData.get("lessonCount") as string, 10) || 0;

  // 📌 4. 레슨 데이터 가져오기
  const lessons = Array.from({ length: lessonCount }, (_, index) => ({
    title: formData.get(`lessonTitle-${index + 1}`) as string,
    videoUrl: formData.get(`lessonVideo-${index + 1}`) as string,
  }));

  // 📌 5. 데이터 구조 정의 (photo를 파일 경로로 저장)
  const data = {
    photo: formData.get("photo"),
    lessons,
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
    level: formData.get("level"),
  };

  // 📌 6. 데이터 검증
  const results = courseSchema.safeParse(data);
  console.log("ressult", results);
  if (!results.success) {
    console.log("Validation Error:", results.error.flatten());

    return results.error.flatten();
  } else {
    // 📌 7. DB 저장 (photo에 경로 저장)
    const session = await getSession();
    console.log("session test", session);
    if (session.id) {
      const course = await db.course.create({
        data: {
          title: results.data.title,
          description: results.data.description,
          price: results.data.price,
          photo: results.data.photo, // 📌 `File` → `string` (경로)
          level: results.data.level,
          user: {
            connect: { id: session.id },
          },
        },
        select: {
          id: true,
        },
      });
      console.log("test", course);
      // 📌 3. Lessons 개별 저장 (courseId 연결)
      await Promise.all(
        results.data.lessons.map((lesson, index) =>
          db.lesson.create({
            data: {
              title: lesson.title,
              videoUrl: lesson.videoUrl,
              order: index + 1, // 강의 순서 설정
              course: {
                connect: { id: course.id }, // 📌 course와 연결
              },
            },
          })
        )
      );
      redirect(`/courses/${course.id}`);
    }
  }
}

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
    }
  );
  const data = await response.json();

  return data;
}
