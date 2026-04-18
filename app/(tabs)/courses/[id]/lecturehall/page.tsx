import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import db from "@/lib/prisma";

async function getLessons(courseId: number) {
  return db.lesson.findMany({
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
}

export default async function Lecturehall({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: idParam } = await params;
  const id = Number(idParam);

  if (Number.isNaN(id)) notFound();

  const lessons = await getLessons(id);
  if (lessons.length === 0) notFound();

  const courseInfo = lessons[0].course;

  return (
    <div className="mx-auto max-w-7xl px-4 py-32">
      <h2 className="text-center text-3xl font-semibold text-gray-900 dark:text-white sm:text-4xl">
        강의 수강
      </h2>
      <div className="mt-10 flex flex-col md:flex-row items-start">
        <Image
          src={courseInfo.photo || "/images/lecture1.webp"}
          alt={courseInfo.title}
          width={500}
          height={256}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="w-full md:ml-8 mt-4 md:mt-0 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <div className="min-w-full">
            {lessons.map((lesson, index) => (
              <div
                key={lesson.id}
                className={`flex h-full w-full justify-between ${
                  index % 2 === 0
                    ? "bg-gray-50 dark:bg-slate-700"
                    : "bg-white dark:bg-slate-500"
                }`}
              >
                <span className="flex items-center overflow-hidden whitespace-nowrap px-6 py-4 text-sm font-medium leading-5 text-gray-900 dark:text-white">
                  #{lesson.order} {lesson.title}
                </span>
                <span className="hidden whitespace-nowrap px-6 py-4 text-right text-sm font-medium leading-5 md:block">
                  <Link
                    className="hover:text-blue-900 text-blue-600 dark:text-blue-200 dark:hover:text-white"
                    href={`/courses/${id}/lectures/${lesson.id}`}
                  >
                    수강하기 →
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
