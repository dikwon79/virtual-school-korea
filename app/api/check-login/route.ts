// app/api/check-login/route.ts
import { NextResponse } from "next/server";
import { getUser } from "@/lib/auth"; // Ensure correct path

// Check login status (GET method)
export const GET = async () => {
  const user = await getUser();
  if (user?.id) {
    return NextResponse.json({ userId: user.id });
  }
  return NextResponse.json({ message: "Not logged in" }, { status: 401 });
};
