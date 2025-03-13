import { NextResponse } from "next/server";
import db from "@/lib/db"; // Ensure your Prisma client is correctly set up

export async function GET(request: Request) {
  try {
    const url = new URL(request.url); // Parse the request URL
    const id = url.pathname.split("/").pop(); // Extract the 'id' from the dynamic route

    if (!id || Array.isArray(id)) {
      // Ensure `id` is a single string
      return NextResponse.json(
        { message: "Invalid or missing room ID" },
        { status: 400 }
      );
    }

    // Query from your Prisma database
    const room = await db.chatRoom.findUnique({
      where: { id }, // Pass `id` directly (type `string`)
      include: { users: { select: { id: true } } },
    });
    console.log(room);
    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room); // Return the room data as JSON
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json(
      { message: "Error fetching room" },
      { status: 500 }
    );
  }
}
