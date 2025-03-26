"use client";
import ListCourse from "@/components/list-course";
import { useEffect, useState } from "react";

interface Course {
  id: number;
  title: string;
  price: number;
  photo: string;
  description: string;
  level: "초급" | "중급" | "고급";
  Payment: {
    start_date: Date;
    end_date: Date;
  }[];
}

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch("/api/courses"); // API 호출
        const data = await res.json();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
        Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courses.map((course: Course) => (
          <ListCourse completionRate={0} key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
}
