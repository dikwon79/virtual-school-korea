import db from "./prisma";
import getSession from "./session";

export async function getUser() {
  const session = await getSession();

  if (!session.id) return null;

  return db.user.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      username: true,
      avatar: true,
    },
  });
}
