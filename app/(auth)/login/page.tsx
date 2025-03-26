"use client";

import FormButton from "@/components/button";
import FormInput from "@/components/input";
import SocialLogin from "@/components/social-login";
import { login } from "./actions";
import { useActionState } from "react";
import { PASSWOR_MIN_LENGTH } from "@/lib/constants";

export default function Login() {
  const [state, action] = useActionState(login, null);

  return (
    <div className="flex flex-col gap-10 py-32 px-6 max-w-lg mx-auto bg-black-50 rounded-lg shadow-lg">
      <div className="flex flex-col gap-2 font-medium">
        <h1 className="text-3xl font-semibold text-center text-white">
          안녕하세요!
        </h1>
        <h2 className="text-xl text-center text-gray-600">
          Log in with email and password
        </h2>
      </div>
      <form action={action} className="flex flex-col gap-4">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border-2 border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          errors={state?.fieldErrors.email}
        />

        <FormInput
          name="password"
          type="password"
          placeholder="Password"
          required
          minLength={PASSWOR_MIN_LENGTH}
          className="border-2 border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          errors={state?.fieldErrors.password}
        />

        <FormButton text="Login" />
      </form>

      <div className="flex flex-col gap-2 mt-6">
        <SocialLogin />
        <p className="text-center text-sm text-gray-500">
          Dont have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}
