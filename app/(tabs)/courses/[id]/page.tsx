"use client"; // Mark this component as client-side
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react"; // Import useState and useEffect
import Link from "next/link";
import db from "@/lib/db";
import Image from "next/image";
interface Course {
  id: number;
  title: string;
  price: number;
  photo: string;
  description: string;
  level: string;
  created_at: Date; // Prisma DateTime is mapped to JavaScript Date type
  updated_at: Date;
  userId: number;
  user: {
    // User relation (nested object)
    username: string;
    avatar: string | null;
  };
}

// Fetch course data
async function getCourse(id: number) {
  const course = await db.course.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return course;
}

export default function CourseDetailPage() {
  const query = useParams();
  const id = Number(query.id); // Get the course id from params and convert to number

  const [course, setCourse] = useState<Course | null>(null); // State to store the course data
  const [loading, setLoading] = useState(true); // State to handle loading status

  useEffect(() => {
    const fetchCourse = async () => {
      if (isNaN(id)) {
        notFound(); // If 'id' is invalid, return not found
        return;
      }

      const courseData = await getCourse(id);
      if (!courseData) {
        notFound(); // If no course found, return not found
      } else {
        setCourse(courseData); // Set course data in state
      }
      setLoading(false); // Set loading to false after fetching data
    };

    fetchCourse();
  }, [id]); // Re-run when `id` changes

  if (loading) {
    return <div>Loading...</div>; // Optionally display a loading state
  }

  if (!course) {
    return notFound(); // If no course is found, return not found
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-32">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <Image
          src={course.photo} // Next.js automatically handles images in the public folder
          alt={course.title}
          width={500}
          height={256}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="md:ml-8 mt-4 md:mt-0">
          {/* Course information */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {course.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {course.description}
          </p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white mt-4">
            ${course.price}
          </p>
          {/* Purchase button */}
          <Link href={`/courses/${id}/checkout`}>
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500">
              Buy Now
            </button>
          </Link>

          {/* Back to courses button */}
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
