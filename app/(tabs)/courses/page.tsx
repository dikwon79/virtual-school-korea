import ListCourse from "@/components/list-course";
import db from "@/lib/db";

// interface Course {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
//   description: string;
//   level: "초급" | "중급" | "고급";
//   tag?: string;
// }

async function getCourses() {
  const courses = await db.course.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
      description: true,
      level: true,
      Payment: {
        // ✅ 코스와 연결된 결제 정보 가져오기
        select: {
          start_date: true,
          end_date: true,
        },
      },
    },
  });
  return courses;
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="mx-auto max-w-7xl px-6 py-32">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center mb-8">
        Courses
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courses.map((course) => (
          <ListCourse completionRate={0} key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
}
