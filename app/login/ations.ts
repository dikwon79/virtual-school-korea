"use server";
import { PASSWOR_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

//find a user with the email
const checkEmailExists = async (email: string) => {
  const User = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(User);
};
const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "An account with this eamil does not exit."),
  password: z.string({
    required_error: "Password is required",
  }),
  //.min(PASSWOR_MIN_LENGTH)
  //.regex(PASSWORD_REGEX),
});
export async function login(prevState: any, formData: FormData) {
  //await new Promise((resolve) => setTimeout(resolve, 5000));
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);

    // if the user is found, check password hash
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxxx"
    );
    console.log(ok);
    // log the use in

    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save(); // 세션 저장(쿠키에 반영)

      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Wrong password."],
          email: [],
        },
      };
    }
  }
}
