"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { WHIPClient } from "@eyevinn/whip-web-client";
import { notFound } from "next/navigation";

import ChatMessagesList from "@/components/chat-messages-list";
import ChatMessagebtn from "@/components/chat-messages-button";

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
  name: string;
  email: string;
} | null;

export default function Broadcast() {
  const query = useParams(); // Use useRouter to access params
  const videoRef = useRef<HTMLVideoElement>(null);
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<User>(null);
  // Check if query.id is available before fetching the room data

  if (!query.id) return; // Ensure that query.id is available
  const roomId = query.id as string; // Ensure TypeScript knows it's a string

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

  useEffect(() => {
    const fetchMessages = async (roomId: string) => {
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
        //console.log("Streaming started", videoRef.current);
      } catch (error) {
        console.error("Media access error:", error);
      }
    };

    startStreaming();

    return () => {
      if (client) {
        (client as any).stop?.();
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [room]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!room) {
    return <div>Room not found.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-6 pt-20">
      {/* 제목 */}
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
          <div className="flex-1 bg-gray-700 p-4 rounded-lg overflow-y-auto border border-gray-600 h-[450px]">
            {user && (
              <ChatMessagesList userId={user.id} initialMessages={messages} />
            )}
          </div>

          {/* 채팅 입력창 */}
          <div className="mt-4">
            <ChatMessagebtn />
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
