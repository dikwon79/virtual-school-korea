import { notFound } from "next/navigation";
import db from "@/lib/db";

interface Lesson {
  id: number;
  title: string;
  videoUrl: string;
  order: number;
}
async function getLesson(courseId: number) {
  const lessons = await db.lesson.findMany({
    where: { courseId }, // courseId에 해당하는 모든 Lesson 조회
    orderBy: { order: "asc" }, // 강의 순서대로 정렬
    include: {
      course: {
        // ✅ Course 정보도 포함
        select: {
          title: true, // 코스명
          photo: true, // 코스 이미지 (필드명은 실제 DB 필드명으로 변경)
        },
      },
    },
  });
  return lessons;
}

export default async function lecturehall({
  params,
}: {
  params: { id: string };
}) {
  // `params.id` 값을 가져와 숫자로 변환
  const { id: idString } = await params;

  const id = Number(idString);

  const courseId = Number(id);
  console.log(courseId);
  const lessons = await getLesson(Number(courseId));
  const courseInfo = lessons[0].course;

  if (!lessons) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-32">
      <h2 className="text-center text-3xl font-semibold text-gray-900 dark:text-white sm:text-4xl">
        강의 수강
      </h2>
      <div className="mt-10 flex flex-col md:flex-row items-start">
        <img
          src={`${courseInfo.photo}/public`}
          alt={courseInfo.title}
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
