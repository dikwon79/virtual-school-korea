import React, { useEffect, useRef, useState } from "react";
import WHEPClient from "../lib/whepClient";

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
    let client: WHEPClient | null = null;

    const loadWHEPClient = async () => {
      const videoElement = videoRef.current;

      if (videoElement && webRtcUrl) {
        client = new WHEPClient(webRtcUrl, videoElement);
        videoElement.muted = isMuted; // 초기 음소거 상태 설정
        await videoElement.play().catch((error) => {
          console.error("비디오 자동 재생 실패:", error);
        });

        const mediaStream = videoElement.srcObject;

        // mediaStream이 MediaStream 타입인지 확인
        if (mediaStream instanceof MediaStream) {
          const audioTracks = mediaStream.getAudioTracks();
          if (audioTracks.length > 0) {
            console.log("오디오 트랙이 있습니다:", audioTracks[0]);
          } else {
            console.log("오디오 트랙이 없습니다.");
          }
        } else {
          console.log("스트림은 MediaStream이 아닙니다.");
        }
      }
    };

    loadWHEPClient();

    return () => {
      if (client) {
        client.close();
      }
    };
  }, [webRtcUrl, isMuted]);

  return (
    <div className="flex flex-col items-center">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={isMuted} // 초기 음소거 상태 설정
        width="400"
        height="400"
        className="border border-gray-300 rounded-lg"
      />
      <button
        className="text-white bg-slate-600 hover:bg-slate-700 py-2 px-4 mt-3 rounded-lg shadow-lg flex justify-center items-center transition-all duration-200 ease-in-out"
        onClick={toggleMute}
      >
        {isMuted ? "소리 켜기" : "소리 끄기"}
      </button>
    </div>
  );
};

export default VideoPlayer;
