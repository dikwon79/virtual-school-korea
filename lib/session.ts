import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

export default async function getSession() {
  return getIronSession(await cookies(), {
    cookieName: "delicious-karror",
    password: process.env.COOKIE_PASSWORD!,
  });
}
