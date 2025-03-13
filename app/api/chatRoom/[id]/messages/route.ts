import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";

//export type InitialChatMessages = Prisma.PromiseReturnType<typeof GETmessages>;
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url); // req.url에서 URL 객체 생성
    const segments = url.pathname.split("/");

    // `messages` 앞에 있는 ID를 가져오기
    const chatRoomId = segments[segments.length - 2];

    if (!chatRoomId) {
      return NextResponse.json(
        { message: "Invalid or missing room ID" },
        { status: 400 }
      );
    }

    console.log("Extracted chatRoomId:", chatRoomId);

    const messages = await db.message.findMany({
      where: {
        chatRoomId,
      },
      select: {
        id: true,
        payload: true,
        created_at: true,
        userId: true,
        user: {
          select: {
            avatar: true,
            username: true,
          },
        },
      },
    });
    console.log("Extracted messages:", messages);
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
