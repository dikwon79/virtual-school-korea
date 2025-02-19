"use client"; // 클라이언트 컴포넌트로 선언

import { useEffect, useState } from "react";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";

interface Course {
  id: number;
  title: string;
  price: number;
}

export default function CoursePayment({ course }: { course: Course }) {
  const [selectedPayment, setSelectedPayment] = useState("tosspayments");

  const handleClick = async () => {
    const tossPayments = await loadTossPayments(
      process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || ""
    );

    if (!tossPayments) {
      console.error("Toss Payments SDK failed to load");
      return;
    }

    // 비회원용 customerKey를 수동으로 설정
    const customerKey = "anonymous_user"; // 혹은 환경 변수로 가져올 수도 있음

    const widgets = tossPayments.widgets({ customerKey });

    widgets.setAmount({
      currency: "KRW",
      value: course.price,
    });

    try {
      await tossPayments.requestPayment({
        method: "CARD",
        amount: course.price,
        orderId: Math.random().toString(36).slice(2),
        orderName: course.title,
        successUrl: `${window.location.origin}/api/payments`,
        failUrl: `${window.location.origin}/api/payments/fail`,
      });
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <>
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
                checked={selectedPayment === option}
                onChange={(e) => setSelectedPayment(e.target.value)}
              />
              <label htmlFor={option} className="ml-3 flex flex-col text-left">
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
      <button
        onClick={handleClick}
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500"
      >
        결제하기
      </button>
    </>
  );
}
