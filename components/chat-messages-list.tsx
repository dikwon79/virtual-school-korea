import Image from "next/image";

import { formatToTimeAgo } from "@/lib/utils";

type Message = {
  id: string;
  payload: string;
  created_at: string;
  userId: number;
  user: {
    avatar: string | null;
    username: string;
  };
};

type ChatMessageListProps = {
  messages: Message[];
  userId: number;
  username: string;
  avatar: string;
};
export default function ChatMessagesList({
  messages,
  userId,
}: ChatMessageListProps) {
  console.log("component", messages);

  return (
    <div className="p-5 flex flex-col gap-5 justify-end text-white">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-2 items-start ${
            message.userId === userId ? "justify-end" : ""
          }`}
        >
          {message.userId === userId ? null : (
            <Image
              src={message.user.avatar || "/images/members/default-avatar.jpeg"}
              alt={message.user.username}
              width={50}
              height={50}
              className="size-8 rounded-full"
            />
          )}
          <div
            className={`flex flex-col gap-1 ${
              message.userId === userId ? "items-end" : ""
            }`}
          >
            <span
              className={`${
                message.userId !== userId ? "bg-neutral-500" : "bg-orange-500"
              } p-2.5 rounded-md`}
            >
              {message.payload}
            </span>
            <span className="text-xs">
              {formatToTimeAgo(message.created_at.toString())}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
