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

export default function Whep() {
  const query = useParams();
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [user, setUser] = useState<User>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const roomId = query.id as string; // Ensure TypeScript knows it's a string

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user...");
        const res = await fetch("/api/session");
        console.log("Response:", res);
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        console.log("User Data:", data);
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
  }, [roomId]); // Use roomId as dependency

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
  }, [roomId]); // Ensure roomId is in the dependency array

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!query.id) return null; // Ensure that query.id is available

  console.log(loading);
  console.log(room);
  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-900 p-6 pt-20">
      <h1 className="text-white text-2xl mb-6">Live Broadcast</h1>
      <div className="w-full max-w-5xl h-auto md:h-[400px] bg-gray-800 border border-gray-600 rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* 비디오 영역 */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 border-b md:border-b-0 md:border-r border-gray-600">
          <VideoPlayer webRtcUrl={webRtcUrl} />
        </div>
        {/* 채팅 영역 */}
        <div className="w-full md:w-1/2 flex flex-col p-4">
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
          {/* 채팅 입력 */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
