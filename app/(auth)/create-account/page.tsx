"use client";

import { useState, useEffect } from "react";
import Button from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useActionState } from "react";
import { createAccount } from "./actions";
import { PASSWOR_MIN_LENGTH } from "@/lib/constants";

export default function CreateAccount() {
  const reducer = async (state: unknown, formData: FormData) => {
    return await createAccount(formData); // createAccount 실행
  };

  const [state, action] = useActionState(reducer, null);
  const [isClient, setIsClient] = useState(false); // State to ensure client-side rendering

  useEffect(() => {
    setIsClient(true); // Mark as client-side after mount
  }, []);

  if (!isClient) {
    return null; // Prevent SSR mismatch
  }

  return (
    <div className="flex flex-col gap-10 py-32 px-6 max-w-lg mx-auto bg-black-50 rounded-lg shadow-lg">
      <div className="flex flex-col gap-2 font-medium">
        <h1 className="text-2xl text-white">안녕하세요 !</h1>
        <h2 className="text-xl text-white">Fill in the form below to join !</h2>
      </div>

      <form action={action} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="Username"
          required
          errors={state?.fieldErrors.username}
          className="border-2 border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border-2 border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <Input
          name="password"
          type="password"
          placeholder="Password"
          minLength={PASSWOR_MIN_LENGTH}
          required
          errors={state?.fieldErrors.password}
          className="border-2 border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          minLength={PASSWOR_MIN_LENGTH}
          required
          errors={state?.fieldErrors.confirm_password}
          className="border-2 border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <Button text="Create account" />
      </form>

      <div className="flex flex-col gap-2 mt-6">
        <SocialLogin />
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
