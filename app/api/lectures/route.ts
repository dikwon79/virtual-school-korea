import { NextResponse } from "next/server";

// 임시 강의 데이터 (실제 DB 연동 시에는 DB에서 데이터를 불러옴)
const lectures = [
  {
    id: 1,
    title: "(한국에서 반드시 필요한) 생활한국어",
    price: 199,
    image: "/images/lecture1.webp",
    description: "Learn React from scratch in this beginner-friendly course.",
    level: "중급",
    tag: "예약구매 할인 🔥",
  },
  {
    id: 2,
    title: "학생들을 위한) 한국어 말하기",
    price: 149,
    image: "/images/lecture2.webp",
    description: "Take your Next.js skills to the next level.",
    level: "초급",
  },
  {
    id: 3,
    title: "(성인들을 위한) 한국어 말하기",
    price: 179,
    image: "/images/lecture3.webp",
    description: "Understand JavaScript deeply with hands-on examples.",
    level: "중급",
    tag: "업데이트 🔥",
  },
];

export async function GET() {
  return NextResponse.json(lectures);
}
