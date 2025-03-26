"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { WHIPClient } from "@eyevinn/whip-web-client";

import ChatMessagesList from "@/components/chat-messages-list";
import ChatMessagebtn from "@/components/chat-messages-button";

// Augmenting the WHIPClient type to include the `stop` method
declare module "@eyevinn/whip-web-client" {
  interface WHIPClient {
    stop?: () => void; // Assuming `stop` is an optional method
  }
}
const WHIP_URL = `https://customer-yx9m95cz62ztzi3v.cloudflarestream.com/5c4cc7b188a36466d761b353cfc7219ckd7cc0c09c57d687ae6d59025761ebfd9/webRTC/publish`;

type Room = {
  id: string;
  created_at: Date;
  updated_at: Date;
  users: { id: number }[];
};

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

export default function Broadcast() {
  const { id } = useParams(); // ✅ useParams()를 직접 구조 분해 할당
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[] | null>(null);
  const [user, setUser] = useState<User>(null);

  // ✅ query.id가 없으면 notFound() 호출
  if (!id) notFound();
  const roomId = id as string;

  // ✅ 사용자 정보 가져오기
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/session");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ 채팅 메시지 가져오기
  useEffect(() => {
    if (!roomId) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/chatRoom/${roomId}/messages`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
          console.log("msg", data);
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [roomId]); // ✅ roomId가 변경되면 다시 실행

  // ✅ 방 정보 가져오기
  useEffect(() => {
    if (!roomId) return;

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
  }, [roomId]); // ✅ roomId가 변경되면 다시 실행

  // ✅ 채팅 스크롤 자동 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // ✅ 비디오 스트리밍
  useEffect(() => {
    if (!room) return;

    let client: WHIPClient | null = null;
    let stream: MediaStream | null = null;

    const startStreaming = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        client = new WHIPClient({
          endpoint: WHIP_URL,
          opts: {
            noTrickleIce: true,
            debug: true,
          },
        });

        await client.ingest(stream);
      } catch (error) {
        console.error("Media access error:", error);
      }
    };

    startStreaming();

    return () => {
      if (client) {
        client.stop?.();
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [room]);

  if (loading) return <div>Loading...</div>;
  if (!room) return <div>Room not found.</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6 pt-20">
      <h1 className="text-white text-2xl mb-6">Live Broadcast</h1>

      {/* 전체 박스 */}
      <div className="w-full max-w-5xl h-[400px] bg-gray-800 border border-gray-600 rounded-lg flex overflow-hidden">
        {/* 왼쪽: 비디오 영역 */}
        <div className="w-1/2 flex flex-col items-center justify-center p-4 border-r border-gray-600">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="border border-gray-300 rounded-lg"
          />
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
                onSendMessage={(newMessage) =>
                  setMessages((prev) => [...(prev ?? []), newMessage])
                }
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
