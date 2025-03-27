"use client";
import React, { useEffect, useRef, useState } from "react";
import { WebRTCPlayer } from "@eyevinn/webrtc-player";

interface VideoPlayerProps {
  webRtcUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ webRtcUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    let player: WebRTCPlayer | null = null;

    const initializePlayer = async () => {
      if (videoRef.current) {
        player = new WebRTCPlayer({
          video: videoRef.current,
          type: "whep",
        });

        try {
          await player.load(new URL(webRtcUrl));
          if (!isMuted) {
            player.unmute();
          }
        } catch (error) {
          console.error("Failed to load WebRTC stream:", error);
        }
      }
    };

    initializePlayer();

    return () => {
      if (player) {
        player.unload();
      }
    };
  }, [webRtcUrl, isMuted]);

  return (
    <div className="flex flex-col items-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isMuted}
        width="400"
        height="200"
        className="border border-gray-300 rounded-lg"
      />
      <button
        className="text-white bg-slate-600 hover:bg-slate-700 py-2 px-4 mt-3 rounded-lg shadow-lg transition-all duration-200 ease-in-out"
        onClick={toggleMute}
      >
        {isMuted ? "소리 켜기" : "소리 끄기"}
      </button>
    </div>
  );
};

export default VideoPlayer;
