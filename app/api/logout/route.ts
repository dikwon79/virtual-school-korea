import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

// 로그아웃 API (POST 요청)
export async function POST() {
  // 세션 가져오기
  const session = await getIronSession(await cookies(), {
    cookieName: "virtualschoolKorea",
    password: process.env.COOKIE_PASSWORD!,
  });

  // 세션이 있으면 삭제
  if (session) {
    await session.destroy();
  }

  // 로그아웃 후 메인 페이지로 리다이렉트
  return NextResponse.redirect("/");
}
