import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import db from "@/lib/prisma";
import CoursePayment from "@/components/CoursePayment";

async function getCourse(id: number) {
  return db.course.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
}

export default async function CourseCheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) notFound();

  const course = await getCourse(id);
  if (!course) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 py-32">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <Image
          src={course.photo}
          alt={course.title}
          width={500}
          height={256}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="md:ml-8 mt-4 md:mt-0 w-full">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {course.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {course.description}
          </p>
          <p className="text-xl font-semibold text-gray-800 dark:text-white mt-4">
            ${course.price}
          </p>

          <div className="mt-6">
            <CoursePayment
              course={{
                id: course.id,
                title: course.title,
                price: course.price,
              }}
            />
          </div>

          <Link
            href={`/courses/${id}`}
            className="mt-6 inline-block text-blue-600 hover:underline"
          >
            ← Back to Course
          </Link>
        </div>
      </div>
    </div>
  );
}
