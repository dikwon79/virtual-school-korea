import { notFound } from "next/navigation";
import Link from "next/link";
import db from "@/lib/db";
import getSession from "@/lib/session";

interface Course {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  level: "초급" | "중급" | "고급";
  tag?: string;
}

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
async function getIsOwner(userId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export default async function CourseDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // `params.id` 값을 가져와 숫자로 변환
  const { id: idString } = await params;

  const id = Number(idString);

  // id가 유효하지 않은 경우 처리
  if (isNaN(id)) {
    return notFound(); // 404 페이지로 리다이렉트
  }
  const course = await getCourse(id);

  if (!course) {
    return notFound();
  }

  const isOwner = await getIsOwner(course.userId);
  //const [course, setCourse] = useState<Course | null>(null);

  return (
    <div className="mx-auto max-w-4xl px-4 py-32">
      <div className="flex flex-col md:flex-row items-center md:items-start">
        <img
          src={`${course.photo}/public`}
          alt={course.title}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg shadow-lg"
        />
        <div className="md:ml-8 mt-4 md:mt-0">
          {/* 코스 정보 */}
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {course.title}
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
