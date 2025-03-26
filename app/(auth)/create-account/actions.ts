"use server";
import { PASSWOR_MIN_LENGTH } from "@/lib/constants";
import db from "@/lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";

import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkUsername = (username: string) => !username.includes("potato");
/*const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;
*/
const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username???",
      })
      .toLowerCase()
      .trim()
      //.transform((username) => `🔥${username}🔥`)
      .refine(checkUsername, "No potatoes allowed!"),

    email: z.string().email().toLowerCase(),

    password: z.string().min(PASSWOR_MIN_LENGTH),
    //.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(4),
  })

  .superRefine(async ({ username }, ctx) => {
    // async 추가
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "Username is already taken!",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    // async 추가
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "email is already taken!",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export async function createAccount(formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };

  const result = await formSchema.safeParseAsync(data); // parse를 쓰면 try catch문을 써야함 safeParse는 throw하지 않는다.
  if (!result.success) {
    return result.error.flatten(); //flatten을 쓰면 object가 간단해져서 사용하기 쉽다.
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    console.log(hashedPassword);

    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const cookie = await getSession();

    cookie.id = user.id;
    await cookie.save();

    redirect("/profile");
  }
}
