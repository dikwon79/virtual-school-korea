// app/api/chatRoom/create/route.js
import { NextResponse } from "next/server";
import db from "@/lib/db";
import getSession from "@/lib/session";

export async function POST() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const room = await db.chatRoom.create({
    data: {
      users: {
        connect: [{ id: session.id }],
      },
    },
    select: {
      id: true,
    },
  });

  return NextResponse.json({ roomId: room.id });
}
