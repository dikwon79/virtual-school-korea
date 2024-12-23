"use client";

import FormButton from "@/components/button";
import FormInput from "@/components/input";
import SocialLogin from "@/components/social-login";
import { login } from "./ations";
import { useActionState } from "react";
import { PASSWOR_MIN_LENGTH } from "@/lib/constants";

export default function Login() {
  const [state, action] = useActionState(login, null);

  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요 !</h1>
        <h2 className="text-xl">Log in with email and password</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />

        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWOR_MIN_LENGTH}
          errors={state?.fieldErrors.password}
        />

        <FormButton text="Create account" />
      </form>

      <SocialLogin />
    </div>
  );
}
