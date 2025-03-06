"use client"; // 클라이언트 사이드에서만 실행되도록 설정

import { useEffect, useRef } from "react";
import {
  WebRTCPlayer,
  Adapter,
  AdapterConnectOptions,
} from "@eyevinn/webrtc-player";

// CustomAdapter 클래스 정의
class CustomAdapter implements Adapter {
  private debug: boolean;
  private localPeer: RTCPeerConnection;
  private channelUrl: URL;

  constructor(peer: RTCPeerConnection, channelUrl: URL) {
    this.debug = false;
    this.localPeer = peer;
    this.channelUrl = channelUrl;
  }

  // 디버그 로깅을 활성화하는 메서드
  enableDebug() {
    this.debug = true;
  }

  // RTCPeerConnection 반환
  getPeer(): RTCPeerConnection {
    return this.localPeer;
  }

  // SDP 협상 흐름을 시작하는 connect 메서드 (Promise 반환)
  connect(opts?: AdapterConnectOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        console.log("Connecting with options:", opts);
        // 예시: 이곳에서 WebRTC peer 연결 및 offer/answer 절차를 구현할 수 있습니다.

        resolve(); // 연결이 성공적으로 이루어졌으면 resolve
      } catch (error) {
        console.error("Error during connection:", error);
        reject(error); // 에러 발생 시 reject
      }
    });
  }

  // Peer를 리셋하는 메서드
  resetPeer() {
    // Peer 리셋 로직을 추가
    this.localPeer = new RTCPeerConnection(); // 예시로 새로 RTCPeerConnection을 생성
    console.log("Peer connection has been reset.");
  }

  // 연결을 종료하는 메서드
  disconnect() {
    // Peer 연결을 종료하는 로직
    this.localPeer.close();
    console.log("Peer connection has been disconnected.");
  }
}

export default function WebRTCComponent() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startWebRTC = async () => {
      try {
        // RTCPeerConnection 생성
        const peer = new RTCPeerConnection();

        // WebRTC Player가 사용할 채널 URL 설정
        const channelUrl = new URL("https://example.com/webrtc-channel");

        // CustomAdapter 인스턴스 생성
        const adapter = new CustomAdapter(peer, channelUrl);

        // 예시로 디버그 활성화
        adapter.enableDebug();

        // 연결 시작
        await adapter.connect(); // connect 메서드는 Promise를 반환하므로 await 처리

        // RTCPeerConnection에서 스트림을 받으면 비디오에 설정
        peer.ontrack = (event) => {
          if (videoRef.current) {
            videoRef.current.srcObject = event.streams[0];
          }
        };

        console.log("WebRTC peer connection established.");
      } catch (error) {
        console.error("Error initializing WebRTC:", error);
      }
    };

    startWebRTC();

    return () => {
      // 컴포넌트가 unmount될 때 연결 종료 및 트랙 제거
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <h1>WebRTC Player</h1>
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "100%" }}
      />
    </div>
  );
}
