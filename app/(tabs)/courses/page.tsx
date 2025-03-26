import ListCourse from "@/components/list-course";
import db from "@/lib/db";
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

interface CoursesPageProps {
  courses: Course[]; // Array of Course objects
}
// Fetch courses with error handling
async function getCourses() {
  try {
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
          select: {
            start_date: true,
            end_date: true,
          },
        },
      },
    });
    return courses;
  } catch (error) {
    console.error("Error fetching courses:", error);
    return [];
  }
}

export async function getStaticProps() {
  const courses = await getCourses();
  return {
    props: {
      courses,
    },
  };
}

export default function CoursesPage({ courses }: CoursesPageProps) {
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
