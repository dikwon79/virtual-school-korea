import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef, useState, useCallback } from "react";

const SUPABASE_PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtaGFncGNveXZnZ3Vya2tmenJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIwOTM4OTQsImV4cCI6MjA1NzY2OTg5NH0.KzaUbNfRiW87w_-7byhQqqYIgtH9pIR91bDiaeMxFpo";

const SUPABASE_URL = "https://cmhagpcoyvggurkkfzrq.supabase.co";

type SupabasePayload = {
  type: "broadcast";
  event: "message";
  payload: ChatMessage;
};
type ChatMessage = {
  id: string;
  payload: string;
  created_at: string;
  userId: number;
  user: { avatar: string | null; username: string };
};
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

  // ✅ `useEffect` 내부 이벤트 핸들러를 `useCallback`으로 최적화
  const handleReceiveMessage = useCallback(
    (payload: SupabasePayload) => {
      console.log("📩 Received payload:", payload);
      console.log("📩 Received payload.payload:", payload.payload);
      onSendMessage(payload.payload);
    },
    [onSendMessage] // `onSendMessage`가 변경될 때만 재생성
  );

  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatRoomId}`);

    channel.current
      .on("system", { event: "message" }, handleReceiveMessage)
      .subscribe();
    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId, handleReceiveMessage]); // ✅ 이제 `onSendMessage`이 변경되어도 안전하게 재구독됨

  // ✅ `onSubmit`을 `useCallback`으로 최적화
  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      if (!message.trim()) return;

      console.log("test", userId);

      const newMessage = {
        id: Date.now().toString(),
        payload: message,
        created_at: new Date().toISOString(),
        userId,
        user: {
          avatar,
          username,
        },
      };

      onSendMessage(newMessage);
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
    },
    [message, userId, avatar, username, onSendMessage] // ✅ 의존성 최적화
  );

  return (
    <div className="mt-4">
      <form
        className="flex items-center relative mt-auto text-white"
        onSubmit={onSubmit}
      >
        <input
          required
          onChange={(e) => setMessage(e.target.value)}
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
