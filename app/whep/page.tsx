import VideoPlayer from "@/components/videoplayer";
import React from "react";

function whep() {
  const webRtcUrl =
    "https://customer-yx9m95cz62ztzi3v.cloudflarestream.com/d7cc0c09c57d687ae6d59025761ebfd9/webRTC/play"; // Replace with your WebRTC playback URL

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="text-center">
        <h1 className="text-white text-3xl mb-4">WebRTC Live Stream</h1>
        <VideoPlayer webRtcUrl={webRtcUrl} />
      </div>
    </div>
  );
}

export default whep;
