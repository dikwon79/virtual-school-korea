import { notFound } from "next/navigation";
import Link from "next/link";
import db from "@/lib/db";
import getSession from "@/lib/session";

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
          <h3 className="mb-12 text-xl font-medium">Payment Options</h3>
          <div>
            {["tosspayments", "kakaopay", "naverpay", "bank_transfer"].map(
              (option, index) => (
                <div key={index} className="mb-7 flex">
                  <input
                    id={option}
                    name="provider"
                    type="radio"
                    className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                    value={option}
                  />
                  <label
                    htmlFor={option}
                    className="ml-3 flex flex-col text-left"
                  >
                    <p className="-mt-1 font-medium text-gray-900 dark:text-gray-100">
                      {option === "tosspayments"
                        ? "카드 결제"
                        : option === "kakaopay"
                        ? "카카오페이"
                        : option === "naverpay"
                        ? "네이버페이"
                        : "실시간 계좌이체"}
                    </p>
                  </label>
                </div>
              )
            )}
          </div>
          <div className="mt-3 w-full rounded-md bg-gray-100 shadow-inner dark:bg-gray-500 p-2">
            <h2 className="text-sm font-medium text-gray-600 dark:text-white">
              You have 1 coupon.{" "}
              <span className="text-blue-600 underline cursor-pointer">
                Click here to use it
              </span>
            </h2>
          </div>
          <div className="mt-10 flex w-full justify-between border-t border-gray-300 pt-10 pb-5 text-lg font-medium">
            <div className="flex flex-col items-start">
              <span className="text-xl font-medium">최종 가격:</span>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-300">
                할부 결제 가능!
              </span>
            </div>
            <span className="text-xl font-medium">₩{course.price}</span>
          </div>
          <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500">
            결제하기
          </button>
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
