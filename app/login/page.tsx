"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { handleForm } from "./ations";
import { useActionState } from "react";

export default function Login() {
  const [state, action] = useActionState(handleForm, {
    potato: 1,
  } as any);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요 !</h1>
        <h2 className="text-xl">Log in with email and password</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput name="email" type="email" placeholder="Email" required />

        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
        />

        <FormButton text="Create account" />
      </form>

      <SocialLogin />
    </div>
  );
}
