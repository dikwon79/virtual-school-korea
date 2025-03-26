"use client";
import Button from "@/components/button";
import Input from "@/components/input";

import { startStream } from "./actions";
import { useActionState } from "react";
export default function AddStream() {
  const [state, action] = useActionState(startStream, null);
  return (
    <form className="p-24 flex flex-col gap-2" action={action}>
      <Input
        name="title"
        required
        placeholder="Title or your stream."
        errors={state?.formErrors}
      />
      <Button text="Start streaming" />
    </form>
  );
}
