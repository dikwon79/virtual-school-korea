import Link from "next/link";

interface ListCoursetProps {
  id: number;
  title: string;
  photo: string;
  level: string;
  description?: string;
  completionRate: number;
}

export default function ListCourse({
  id,
  title,
  photo,
  level,
  description,
  completionRate,
}: ListCoursetProps) {
  return (
    <div
      key={id}
      className="relative flex flex-col items-center rounded-lg overflow-hidden shadow-xl bg-white dark:bg-gray-800 hover:scale-105 transform transition-all duration-300"
    >
      {/* 태그 */}
      <div className="absolute top-4 left-4 flex space-x-2 z-10">
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium shadow-lg ${
            level === "초급"
              ? "bg-yellow-200 text-yellow-700"
              : "bg-green-200 text-green-700"
          }`}
        >
          {level}
        </span>
        {description && (
          <span className="inline-flex items-center rounded-full bg-red-500 text-white px-3 py-1 text-sm font-medium shadow-lg">
            {description}
          </span>
        )}
      </div>

      {/* 코스 이미지 */}
      <Link href={`/courses/${id}`}>
        <img
          src={`${photo}/public`}
          alt={title}
          className="w-full h-auto max-h-56 object-cover rounded-t-lg transition-transform duration-300 transform hover:scale-110"
        />
      </Link>

      {/* 코스 정보 */}
      <div className="info relative -top-14 z-10 flex w-11/12 flex-col justify-center rounded-lg bg-white px-2 py-5 text-center shadow-xl dark:bg-gray-700 dark:text-white dark:shadow-gray-800 transition-transform duration-200 ease-in-out max-h-28">
        <Link href={`/courses/${id}`} className="px-4">
          <h3 className="mb-5 w-full overflow-hidden text-xl text-ellipsis whitespace-nowrap">
            {title}
          </h3>
          <div className="relative h-3 w-full rounded-full bg-blue-200 dark:bg-white">
            <div
              className="h-3 rounded-full bg-blue-700 dark:bg-blue-500"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
          <span className="text-md mt-3 block font-medium">
            {completionRate}% complete
          </span>
        </Link>
      </div>
    </div>
  );
}
