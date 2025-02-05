"use server";
import { getUser } from "@/lib/auth";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export const logOut = async () => {
  const session = await getSession();
  session?.destroy();
  redirect("/");
};

export const checkLogin = async () => {
  const user = await getUser();
  return user?.id;
};
