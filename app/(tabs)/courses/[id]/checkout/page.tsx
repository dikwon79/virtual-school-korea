import { notFound } from "next/navigation";
import Link from "next/link";
import db from "@/lib/db";
import getSession from "@/lib/session";
import CoursePayment from "@/components/CoursePayment";

async function getCourse(id: number) {
  const course = await db.course.findUnique({
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
  return course;
}

async function getIsOwner(userId: number) {
  const session = await getSession();
  return session?.id === userId;
}

export default async function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const course = await getCourse(id);
  if (!course) return notFound();

  const session = await getSession(); // 세션 가져오기
  const isOwner = session?.id === course.userId; // 본인 소유 확인

  return (
    <div className="mx-auto max-w-4xl px-4 py-32">
      <h2 className="text-center text-3xl font-semibold text-gray-900 dark:text-white sm:text-4xl">
        구매 결제
      </h2>
      <div className="mt-10 flex flex-col md:flex-row items-start">
        <img
          src={`${course.photo}/public`}
          alt={course.title}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="w-full md:ml-8 mt-4 md:mt-0 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <CoursePayment course={course} />
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
