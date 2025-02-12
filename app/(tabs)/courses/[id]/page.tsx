"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Course {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  level: "초급" | "중급" | "고급";
  tag?: string;
}

export default function CourseDetailPage() {
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);

  // API 요청으로 데이터 가져오기
  useEffect(() => {
    // Next.js API에서 데이터 가져오기
    async function fetchCourses() {
      const response = await fetch("/api/lectures"); // API 엔드포인트 호출
      const data: Course[] = await response.json(); // JSON 데이터를 Course 배열로 파싱
      const foundCourse = data.find((course) => course.id === Number(id)); // ID에 해당하는 코스를 찾기
      setCourse(foundCourse || null); // 상태 업데이트
    }

    fetchCourses(); // 호출
  }, [id]);

  if (!course)
    return <p className="text-center text-gray-500">Course not found</p>;

  return (
    <div className="mx-auto max-w-4xl px-4 py-32">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          src={course.image}
          alt={course.name}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="md:ml-8 mt-4 md:mt-0">
          {/* 코스 정보 */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {course.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {course.description}
          </p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white mt-4">
            ${course.price}
          </p>
          {/* 구매 버튼 */}
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500">
            Buy Now
          </button>
          {/* 돌아가기 버튼 */}
          <Link
            href="/courses"
            className="mt-6 inline-block text-blue-600 hover:underline"
          >
            ← Back to Courses
          </Link>
        </div>
      </div>
    </div>
  );
}
