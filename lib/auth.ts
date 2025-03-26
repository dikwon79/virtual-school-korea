import { notFound } from "next/navigation";
import db from "./prisma";
import getSession from "./session";

export async function getUser() {
  const session = await getSession();

  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        username: true,
        avatar: true,
      },
    });
    return user;
  }
  notFound();
}
