// app/api/courses/route.ts

import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  try {
    const courses = await db.course.findMany({
      select: {
        title: true,
        price: true,
        created_at: true,
        photo: true,
        id: true,
        description: true,
        level: true,
        Payment: {
          select: {
            start_date: true,
            end_date: true,
          },
        },
      },
    });
    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.error();
  }
}
