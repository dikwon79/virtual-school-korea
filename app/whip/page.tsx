"use client";
import { useEffect, useRef } from "react";
import { WHIPClient } from "@eyevinn/whip-web-client";

const WHIP_URL = `https://customer-yx9m95cz62ztzi3v.cloudflarestream.com/5c4cc7b188a36466d761b353cfc7219ckd7cc0c09c57d687ae6d59025761ebfd9/webRTC/publish`;

export default function Broadcast() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
            noTrickleIce: true, // Disable Trickle ICE
            debug: true, // Optional: Enable debug logs
          },
        });

        await client.ingest(stream);
        console.log("Streaming started", videoRef.current);
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
  }, []);

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
    </div>
  );
}
