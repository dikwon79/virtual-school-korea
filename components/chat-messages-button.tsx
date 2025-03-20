import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

const SUPABASE_PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtaGFncGNveXZnZ3Vya2tmenJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwOTM4OTQsImV4cCI6MjA1NzY2OTg5NH0.KzaUbNfRiW87w_-7byhQqqYIgtH9pIR91bDiaeMxFpo";

const SUPABASE_URL = "https://cmhagpcoyvggurkkfzrq.supabase.co";
type ChatMessagebtnProps = {
  chatRoomId: string;
  userId: number;
  username: string;
  avatar: string;

  onSendMessage: (message: {
    id: string;
    payload: string;
    created_at: string;
    userId: number;
    user: { avatar: string | null; username: string };
  }) => void;
};

export default function ChatMessagebtn({
  onSendMessage,
  chatRoomId,
  userId,
  username,
  avatar,
}: ChatMessagebtnProps) {
  const [message, setMessage] = useState("");

  const channel = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current
      .on("broadcast", { event: "message" }, (payload) => {
        console.log("📩 Received payload:", payload);
        console.log("📩 Received payload.payload:", payload.payload); // 내부 데이터 확인

        onSendMessage(payload.payload);
      })
      .subscribe();
    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("test", userId);
    const newMessage = {
      id: Date.now().toString(), // 임시 ID
      payload: message,
      created_at: new Date().toISOString(),
      userId,
      user: {
        avatar,
        username,
      },
    };
    onSendMessage(newMessage); // 부모의 setMessages 호출
    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: Date.now(),
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          avatar,
          username,
        },
      },
    });
    setMessage("");
  };

  return (
    <div className="mt-4">
      <form
        className="flex items-center relative mt-auto text-white"
        onSubmit={onSubmit}
      >
        <input
          required
          onChange={onChange}
          value={message}
          className="bg-transparent rounded-full w-full h-10 focus:outline-none px-5 ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-neutral-50 border-none placeholder:text-neutral-400"
          type="text"
          name="message"
          placeholder="Write a message..."
        />
        <button className="absolute right-0">
          <ArrowUpCircleIcon className="size-10 text-orange-500 transition-colors hover:text-orange-300" />
        </button>
      </form>
    </div>
  );
}
