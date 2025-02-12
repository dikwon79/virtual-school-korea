"use server";

import { z } from "zod";
import fs from "fs/promises";
import path from "path"; // 📌 파일 경로 설정을 위한 모듈
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

// 📌 Zod 스키마 수정
const productSchema = z.object({
  photo: z.string({ required_error: "Photo must be a string (file path)" }), // 📌 파일 경로 저장
  title: z.string({ required_error: "Title is required" }),
  description: z.string({ required_error: "Description is required" }),
  price: z.coerce.number({ required_error: "Price is required" }),
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

  // 📌 1. 사진 파일 가져오기
  const photo = formData.get("photo");

  //   // 📌 2. 사진 검증 (이미지 타입 & 3MB 이하)
  //   if (!(photo instanceof File)) {
  //     throw new Error("이미지가 업로드되지 않았습니다.");
  //   }

  //   const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  //   const maxSize = 3 * 1024 * 1024; // 3MB

  //   if (!allowedTypes.includes(photo.type)) {
  //     throw new Error(
  //       "허용되지 않은 이미지 형식입니다. (JPG, PNG, GIF, WEBP만 가능)"
  //     );
  //   }

  //   if (photo.size > maxSize) {
  //     throw new Error("이미지 크기가 3MB를 초과할 수 없습니다.");
  //   }

  //   // 📌 3. 파일 저장 (서버의 `/public/images/courses/` 폴더에 저장)
  //   const uploadDir = path.join(process.cwd(), "public", "images", "courses"); // 업로드 폴더 경로
  //   await fs.mkdir(uploadDir, { recursive: true }); // 폴더 없으면 생성

  //   const uniqueFileName = `${Date.now()}-${photo.name}`; // 파일 이름 중복 방지
  //   const photoPath = path.join(uploadDir, uniqueFileName);
  //   const publicPhotoPath = `/images/courses/${uniqueFileName}`; // 웹에서 접근 가능한 경로

  //   const photoData = await photo.arrayBuffer();
  //   await fs.writeFile(photoPath, Buffer.from(photoData));

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
  };

  // 📌 6. 데이터 검증
  const results = productSchema.safeParse(data);
  if (!results.success) {
    return results.error.flatten();
  } else {
    // 📌 7. DB 저장 (photo에 경로 저장)
    const session = await getSession();
    if (session.id) {
      const course = await db.course.create({
        data: {
          title: results.data.title,
          description: results.data.description,
          price: results.data.price,
          photo: results.data.photo, // 📌 `File` → `string` (경로)
          user: {
            connect: { id: session.id },
          },
        },
        select: {
          id: true,
        },
      });

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
