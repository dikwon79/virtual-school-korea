// TypeScript로 변환된 WHEPClient 클래스
export default class WHEPClient {
  private url: string; // WebRTC 서버 URL
  private videoElement: HTMLVideoElement; // HTML 비디오 요소
  private peerConnection: RTCPeerConnection; // WebRTC PeerConnection 객체

  constructor(url: string, videoElement: HTMLVideoElement) {
    this.url = url; // Cloudflare WebRTC URL
    this.videoElement = videoElement; // 비디오 요소
    this.peerConnection = new RTCPeerConnection(); // 새 WebRTC 연결 초기화
  }

  public async start(): Promise<void> {
    try {
      // 1. 서버로부터 SDP Offer 요청
      const response = await fetch(this.url, { method: "POST" }); // 서버로 POST 요청
      if (!response.ok) {
        throw new Error(`Failed to fetch offer: ${response.statusText}`);
      }

      const { offer } = await response.json(); // Offer만 파싱
      if (!offer) {
        throw new Error("No offer received from the server.");
      }

      // 2. 서버에서 받은 Offer를 Remote Description으로 설정
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      );

      // 3. 클라이언트에서 Answer 생성
      const localDescription = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(localDescription);

      // 4. 생성한 Answer를 서버로 전송
      await fetch(this.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: this.peerConnection.localDescription }),
      });

      // 5. ICE Candidate 관리
      this.peerConnection.addEventListener("icecandidate", (event) => {
        if (event.candidate) {
          // ICE Candidate 정보를 서버로 전송
          fetch(this.url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ candidate: event.candidate }),
          });
        }
      });

      // 6. OnTrack 이벤트로 비디오 스트림 설정
      this.peerConnection.addEventListener("track", (event: RTCTrackEvent) => {
        this.videoElement.srcObject = event.streams[0]; // HTML 비디오 요소에 스트림 연결
      });
    } catch (error) {
      console.error("Error starting WHEP client:", error);
      throw error;
    }
  }
}
