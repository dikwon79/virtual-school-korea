"use client";

import db from "@/lib/db";

import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Define the types for stream and user
interface User {
  avatar: string | null;
  username: string;
}

interface Stream {
  title: string;
  stream_key: string;
  stream_id: string;
  userId: number;
  user: User;
}

// Fetch stream data
async function getStream(id: number): Promise<Stream | null> {
  const stream = await db.liveStream.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
      stream_key: true,
      stream_id: true,
      userId: true,
      user: {
        select: {
          avatar: true,
          username: true,
        },
      },
    },
  });
  return stream;
}

export default function StreamDetail() {
  const query = useParams();
  const id = Number(query.id); // Convert 'id' from string to number

  // Explicitly typing state
  const [stream, setStream] = useState<Stream | null>(null);
  const [session, setSession] = useState<{ id?: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (isNaN(id)) {
        return notFound();
      }

      const streamData = await getStream(id);
      if (!streamData) {
        return notFound();
      }
      setStream(streamData);

      // Fetch user session from the API
      const userResponse = await fetch("/api/user");
      const userData = await userResponse.json();
      setSession(userData);
    };

    fetchData();
  }, [id]);

  if (!stream || !session) {
    return <div>Loading...</div>; // Or handle loading state appropriately
  }

  return (
    <div className="p-32">
      <div className="relative aspect-video">
        <iframe
          src={`https://${process.env.CLOUDFLARE_DOMAIN}/${stream.stream_id}/iframe`}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          className="w-full h-full rounded-md"
        ></iframe>
      </div>
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <div className="size-10 overflow-hidden rounded-full">
          {stream.user.avatar !== null ? (
            <Image
              src={stream.user.avatar}
              width={40}
              height={40}
              alt={stream.user.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{stream.user.username}</h3>
        </div>
      </div>
      <div className="p-5">
        <h1 className="text-2xl font-semibold">{stream.title}</h1>
      </div>
      {stream.userId === session.id! ? (
        <div className="bg-yellow-200 text-black p-5 rounded-md">
          <div className="flex gap-2">
            <span className="font-semibold">Stream URL:</span>
            <span>rtmps://live.cloudflare.com:443/live/</span>
          </div>
          <div className="flex  flex-wrap">
            <span className="font-semibold">Secret Key:</span>
            <span>{stream.stream_key}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
