"use client";
import React, { useEffect, useRef } from "react";
import WHEPClient from "../lib/whepClient"; // WHEPClient가 export된 경우
interface VideoPlayerProps {
  webRtcUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ webRtcUrl }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const unmuteVideo = () => {
    if (videoRef.current) {
      videoRef.current.muted = false; // 음소거 해제
    }
    console.log(videoRef);
  };
  useEffect(() => {
    let client: WHEPClient | null = null; // 타입 명시

    const loadWHEPClient = async () => {
      // Dynamically import WHEPClient
      //const { default: WHEPClient } = await import("../lib/whepClient");
      const videoElement = videoRef.current;

      if (videoElement && webRtcUrl) {
        // Initialize the WHEPClient
        client = new WHEPClient(webRtcUrl, videoElement);
      }
    };

    loadWHEPClient();

    // Cleanup when component unmounts
    return () => {
      if (client) {
        client.close();
      }
    };
  }, [webRtcUrl]);

  return (
    <div className="flex flex-col items-center">
      {/* Video element for WebRTC stream */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        className="border border-gray-300 rounded-lg"
      ></video>
      <button
        className="text-white bg-slate-600 hover:bg-slate-700 py-2 px-4 mt-3 rounded-lg shadow-lg flex justify-center items-center transition-all duration-200 ease-in-out"
        onClick={unmuteVideo}
      >
        소리 켜기
      </button>
    </div>
  );
};

export default VideoPlayer;
