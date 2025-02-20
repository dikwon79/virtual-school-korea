import React from "react"; // React 컴포넌트 불러오기
import { use } from "react"; // ✅ React Server Hook
import db from "@/lib/db";
import LecturePlayer from "@/components/LecturePlayer";

// 타입 설정
type Course = {
  title: string;
};

type Lesson = {
  id: number;
  title: string;
  videoUrl: string;
  courseId: number;
  order: number;
  created_at: Date;
  updated_at: Date;
  course: Course;
};

// 서버에서 Lesson 데이터를 가져오는 함수
async function getLesson(courseId: number) {
  const lessons = await db.lesson.findMany({
    where: { courseId },
    orderBy: { order: "asc" }, // 정렬
    include: { course: { select: { title: true } } },
  });
  return lessons;
}

export default function LectureDetail({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  const params = use(paramsPromise); // 비동기 파라미터 언랩
  const courseId = Number(params.id);
  const lessons: Lesson[] | null = use(getLesson(courseId)); // 서버에서 데이터를 가져옴

  if (!lessons || lessons.length === 0) {
    return <div>Lesson not found</div>;
  }

  return (
    <LecturePlayer
      courseTitle={lessons[0]?.course?.title || "No Title"}
      lessons={lessons}
    />
  );
}
