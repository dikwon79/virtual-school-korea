export default class WHEPClient {
  private url: string;
  private videoElement: HTMLVideoElement;
  private pc: RTCPeerConnection;

  constructor(url: string, videoElement: HTMLVideoElement) {
    this.url = url;
    this.videoElement = videoElement;
    this.pc = new RTCPeerConnection();

    this.init();
  }

  private async init() {
    // Set up event listener for incoming video tracks
    this.pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        this.videoElement.srcObject = event.streams[0];
      }
    };

    // Create an SDP offer with "receive only" direction
    const offer = await this.pc.createOffer({
      offerToReceiveAudio: true, // Request to receive audio
      offerToReceiveVideo: true, // Request to receive video
    });

    await this.pc.setLocalDescription(offer);

    // Send the offer to the server
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/sdp",
      },
      body: offer.sdp,
    });

    // Set remote description (the server's answer)
    const answer = await response.text();
    await this.pc.setRemoteDescription({
      type: "answer",
      sdp: answer,
    });
  }

  close() {
    if (this.pc) {
      this.pc.close();
    }
  }
}
