"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { WHIPClient } from "@eyevinn/whip-web-client";
import { notFound } from "next/navigation";

import db from "@/lib/db";
import ChatMessagesList from "@/components/chat-messages-list";
import getSession from "@/lib/session";

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
    if (!query.id) return; // Ensure that query.id is available
    const roomId = query.id as string; // Ensure TypeScript knows it's a string

    const fetchMessages = async (roomId: string) => {
      try {
        const res = await fetch(`/api/chatRoom/${roomId}/messages`);
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
          console.log(messages);
        } else {
          console.error("Failed to fetch messages");
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const fetchRoom = async () => {
      try {
        const res = await fetch(`/api/chatRoom/${query.id}`);

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
    fetchMessages(roomId); // roomId를 인자로 전달
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
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="text-center">
        <h1 className="text-white text-3xl mb-4">Live Broadcast</h1>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="max-w-lg border border-gray-300 rounded-lg"
        />
      </div>
      {user && <ChatMessagesList userId={user.id} initialMessages={messages} />}
    </div>
  );
}
