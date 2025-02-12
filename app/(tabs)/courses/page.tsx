"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface Course {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  level: "초급" | "중급" | "고급";
  tag?: string;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  // API 요청으로 데이터 가져오기
  useEffect(() => {
    // Next.js API에서 데이터 가져오기
    async function fetchCourses() {
      const response = await fetch("/api/lectures"); // API 엔드포인트 호출
      const data: Course[] = await response.json(); // JSON 데이터를 Course 배열로 파싱
      setCourses(data); // 상태 업데이트
    }

    fetchCourses(); // 호출
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
        Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="relative flex flex-col items-center rounded-lg overflow-hidden shadow-xl bg-white dark:bg-gray-800 hover:scale-105 transform transition-all duration-300"
          >
            {/* 태그 */}
            <div className="absolute top-4 left-4 flex space-x-2 z-10">
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium shadow-lg ${
                  course.level === "초급"
                    ? "bg-yellow-200 text-yellow-700"
                    : "bg-green-200 text-green-700"
                }`}
              >
                {course.level}
              </span>
              {course.tag && (
                <span className="inline-flex items-center rounded-full bg-red-500 text-white px-3 py-1 text-sm font-medium shadow-lg">
                  {course.tag}
                </span>
              )}
            </div>

            {/* 코스 이미지 */}
            <Link href={`/courses/${course.id}`}>
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-auto max-h-56 object-cover rounded-t-lg transition-transform duration-300 transform hover:scale-110"
              />
            </Link>

            <div className="info relative -top-14 z-10 flex w-11/12 flex-col justify-center rounded-lg bg-white px-2 py-5 text-center shadow-xl dark:bg-gray-700 dark:text-white dark:shadow-gray-800 transition-transform duration-200 ease-in-out max-h-28">
              <a href={`/courses/${course.id}`} className="px-4">
                <h3 className="mb-5 w-full overflow-hidden text-xl text-ellipsis whitespace-nowrap">
                  {course.title}
                </h3>
                <div className="relative h-3 w-full rounded-full bg-blue-200 dark:bg-white">
                  <div
                    className="h-3 rounded-full bg-blue-700 dark:bg-blue-500"
                    style={{ width: "51%" }}
                  ></div>
                </div>
                <span className="text-md mt-3 block font-medium">
                  51% complete
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
