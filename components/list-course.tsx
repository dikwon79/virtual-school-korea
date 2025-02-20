import Link from "next/link";

interface ListCoursetProps {
  id: number;
  title: string;
  photo: string;
  level: string;
  description?: string;
  completionRate: number;

  Payment: {
    start_date: Date;
    end_date: Date;
  }[]; // ✅ Payment를 배열로 변경
}

export default function ListCourse({
  id,
  title,
  photo,
  level,
  description,
  completionRate,
  Payment,
}: ListCoursetProps) {
  const now = new Date();

  // 결제 내역 중 start_date ~ end_date 사이에 있는지 확인
  const hasActivePayment = Payment.some((pay) => {
    const startDate = pay.start_date;
    const endDate = pay.end_date;
    return now >= startDate && now <= endDate;
  });

  console.log(hasActivePayment);
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
      <Link href={`/courses/${id}${hasActivePayment ? "/lecturehall" : ""}`}>
        <img
          src={`${photo}/public`}
          alt={title}
          className="w-full h-auto max-h-56 object-cover rounded-t-lg transition-transform duration-300 transform hover:scale-110"
        />
      </Link>

      {/* 코스 정보 */}
      <div className="info relative -top-14 z-10 flex w-11/12 flex-col justify-center rounded-lg bg-white px-2 py-5 text-center shadow-xl dark:bg-gray-700 dark:text-white dark:shadow-gray-800 transition-transform duration-200 ease-in-out max-h-28">
        <Link
          href={`/courses/${id}${hasActivePayment ? "/lecturehall" : ""}`} // ✅ 조건부로 lecturehall 추가
          className="px-4"
        >
          <h3 className="mb-5 w-full overflow-hidden text-xl text-ellipsis whitespace-nowrap">
            {title}
          </h3>
          {hasActivePayment ? (
            <>
              <div className="relative h-3 w-full rounded-full bg-blue-200 dark:bg-white">
                <div
                  className="h-3 rounded-full bg-blue-700 dark:bg-blue-500"
                  style={{ width: `${completionRate}%` }}
                ></div>
              </div>
              <span className="text-md mt-3 block font-medium">
                {completionRate}% complete
              </span>
            </>
          ) : (
            <div className="relative h-5 w-full">{description}</div>
          )}
        </Link>
      </div>
    </div>
  );
}
