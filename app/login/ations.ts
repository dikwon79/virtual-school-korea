"use server";
import { PASSWOR_MIN_LENGTH, PASSWORD_REGEX } from "@/lib/constants";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email().toLowerCase(),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(PASSWOR_MIN_LENGTH)
    .regex(PASSWORD_REGEX),
});
export async function login(prevState: any, formData: FormData) {
  //await new Promise((resolve) => setTimeout(resolve, 5000));
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
