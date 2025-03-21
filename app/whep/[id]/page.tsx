"use client";
import ChatMessagebtn from "@/components/chat-messages-button";
import ChatMessagesList from "@/components/chat-messages-list";

import VideoPlayer from "@/components/videoplayer";
import { notFound, useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
const webRtcUrl =
  "https://customer-yx9m95cz62ztzi3v.cloudflarestream.com/d7cc0c09c57d687ae6d59025761ebfd9/webRTC/play"; // Replace with your WebRTC playback URL

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

type User = {
  id: number;
  username: string;
  avatar: string;
} | null;
type Room = {
  id: string;
  created_at: Date;
  updated_at: Date;
  users: { id: number }[];
};
export default function whep() {
  const query = useParams(); // Use useRouter to access params
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [user, setUser] = useState<User>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  if (!query.id) return; // Ensure that query.id is available
  const roomId = query.id as string; // Ensure TypeScript knows it's a string

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user..."); // 실행 여부 확인
        const res = await fetch("/api/session");
        console.log("Response:", res); // 응답 확인
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        console.log("User Data:", data); // 받아온 데이터 확인
        setUser(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchMessages = async (roomId: string) => {
      try {
        const res = await fetch(`/api/chatRoom/${roomId}/messages`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages(roomId);
  }, []);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/chatRoom/${roomId}`);

        const data = await res.json();
        if (res.ok) {
          setRoom(data);
        } else {
          console.error("Room not found");
          notFound();
        }
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [query.id]); // Dependency on query.id
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  console.log("ttest", user?.id);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6 pt-20">
      {/* 제목 */}
      <h1 className="text-white text-2xl mb-6">Live Broadcast</h1>
      {/* 전체 박스 */}
      <div className="w-full max-w-5xl h-[400px] bg-gray-800 border border-gray-600 rounded-lg flex overflow-hidden">
        {/* 왼쪽: 비디오 영역 */}
        <div className="w-1/2 flex flex-col items-center justify-center p-4 border-r border-gray-600">
          <VideoPlayer webRtcUrl={webRtcUrl} />
        </div>

        {/* 오른쪽: 채팅 영역 */}
        <div className="w-1/2 flex flex-col p-4">
          {/* 채팅 메시지 박스 */}
          <div
            ref={chatContainerRef}
            className="flex-1 bg-gray-700 p-4 rounded-lg overflow-y-auto border border-gray-600 h-[450px]"
          >
            {messages === null ? (
              <div className="text-white text-center">Loading messages...</div>
            ) : (
              user && (
                <ChatMessagesList
                  userId={user.id}
                  username={user.username}
                  avatar={user.avatar}
                  messages={messages}
                />
              )
            )}
          </div>

          {/* 채팅 입력창 */}
          <div className="mt-4">
            {user && (
              <ChatMessagebtn
                userId={user.id}
                chatRoomId={roomId}
                username={user.username}
                avatar={user.avatar}
                onSendMessage={(newMessage) => {
                  setMessages((prev) => [...(prev ?? []), newMessage]);
                }}
              />
            )}

            {/* <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full p-2 rounded-lg bg-gray-900 text-white border border-gray-600"
                /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
