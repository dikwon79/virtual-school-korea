"use client";
import Image from "next/image";

type Course = {
  id: number;
  title: string;
  duration: string;
  startDate: string;
  applicants: number;
  imageSrc: string;
};

const courses: Course[] = [
  {
    id: 1,
    title: "생활한국어",
    duration: "4주 완성",
    startDate: "D-5",
    applicants: 33,
    imageSrc: "/course1.jpg",
  },
  {
    id: 2,
    title: "어휘보카",
    duration: "2주 완성",
    startDate: "D-10",
    applicants: 21,
    imageSrc: "/course2.jpg",
  },
  {
    id: 3,
    title: "매일읽기",
    duration: "4주 완성",
    startDate: "D-15",
    applicants: 45,
    imageSrc: "/course3.jpg",
  },
];

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <div className="bg-[#374151] shadow-lg rounded-lg overflow-hidden w-full">
      <div className="p-4">
        <div className="mb-12 flex flex-wrap items-center justify-between">
          <h5 className="whitespace-nowrap text-2xl font-medium text-white">
            {course.title}
          </h5>
          <div className="flex items-center text-sm font-medium">
            <span className="mr-5 whitespace-nowrap rounded-full bg-blue-500 px-2 py-px text-white">
              {course.duration}
            </span>
            <span className="text-red-500 whitespace-nowrap font-medium">
              {course.startDate}
            </span>
          </div>
        </div>
        <Image
          className="w-full h-20 object-cover"
          src={course.imageSrc}
          alt={course.title}
          width={48}
          height={48}
        />
        <div className="flex justify-between mt-2">
          <span className="text-gray-500">신청자 {course.applicants}명</span>
          <a href="#" className="text-blue-500">
            자세히 보기 →
          </a>
        </div>
      </div>
    </div>
  );
};

const CourseList = () => {
  return (
    <div className="w-full mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
