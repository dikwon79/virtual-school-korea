"use client";
import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import db from "@/lib/prisma";
import Image from "next/image";

// Define types for the course and lesson
interface Course {
  title: string;
  photo: string;
}

interface Lesson {
  id: number;
  order: number;
  title: string;
  courseId: number;
  course: Course;
}

// Fetch lessons for the given courseId
async function GetLesson(courseId: number): Promise<Lesson[]> {
  const lessons = await db.lesson.findMany({
    where: { courseId },
    orderBy: { order: "asc" },
    include: {
      course: {
        select: {
          title: true,
          photo: true,
        },
      },
    },
  });
  return lessons;
}

export default function Lecturehall() {
  const [lessons, setLessons] = useState<Lesson[]>([]); // State to store lessons
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [courseInfo, setCourseInfo] = useState<Course | null>(null); // State to store course info
  const query = useParams(); // Get route parameters
  const id = Number(query.id); // Convert 'id' from string to number

  // Fetch lessons when component mounts or id changes
  useEffect(() => {
    const fetchData = async () => {
      if (isNaN(id)) {
        notFound(); // If 'id' is invalid, return not found
        return;
      }

      const lessonsData = await GetLesson(id);
      if (lessonsData.length === 0) {
        notFound(); // If no lessons found, return not found
      } else {
        setLessons(lessonsData);
        setCourseInfo(lessonsData[0].course); // Set course info from the first lesson
      }
      setLoading(false); // Set loading to false after fetching data
    };

    fetchData();
  }, [id]); // Re-run when id changes

  if (loading) return <div>Loading...</div>; // Show loading state

  if (!lessons || lessons.length === 0) {
    return notFound(); // If no lessons, return not found
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-32">
      <h2 className="text-center text-3xl font-semibold text-gray-900 dark:text-white sm:text-4xl">
        강의 수강
      </h2>
      <div className="mt-10 flex flex-col md:flex-row items-start">
        <Image
          src={courseInfo?.photo || "/default-image.jpg"} // Fallback to a default image if courseInfo is null
          alt={courseInfo?.title || "Course Title"}
          width={500}
          height={256}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="w-full md:ml-8 mt-4 md:mt-0 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <div className="min-w-full">
            {lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                className={`focus:outline-none cursor-pointer focus:ring focus:ring-blue-400 flex h-full w-full justify-between 
                  ${
                    index % 2 === 0
                      ? "bg-gray-50 dark:bg-slate-700"
                      : "bg-white dark:bg-slate-500"
                  }`}
              >
                {/* 강의 정보 */}
                <span className="flex items-center overflow-hidden whitespace-nowrap px-6 py-4 text-sm font-medium leading-5 text-gray-900 dark:text-white">
                  #{lesson.order} {lesson.title}
                </span>

                {/* 강의 링크 */}
                <span className="hidden whitespace-nowrap px-6 py-4 text-right text-sm font-medium leading-5 md:block">
                  <a
                    className="hover:text-blue-900 text-blue-600 dark:text-blue-200 dark:hover:text-white"
                    href={`./lectures/${lesson.id}`}
                  >
                    수강하기 →
                  </a>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
