"use client"

import { useMeeting } from "@videosdk.live/react-sdk";

const Controls = () => {
    const { leave, toggleMic, toggleWebcam, startHls, stopHls, hlsState } =
    useMeeting();

  return (
    <>
      <div>
        <button onClick={() => leave()}>Leave</button>
        &emsp;|&emsp;
        <button onClick={() => toggleMic()}>toggleMic</button>
        <button onClick={() => toggleWebcam()}>toggleWebcam</button>
        &emsp;|&emsp;
        <button
          onClick={() => {
            startHls({
              layout: {
                type: "SPOTLIGHT",
                priority: "PIN",
                gridSize: 20,
              },
              theme: "DARK",
              mode: "video-and-audio",
              quality: "high",
              orientation: "landscape",
            });
          }}
        >
          Start HLS
        </button>
        <button onClick={() => stopHls()}>Stop HLS</button>
      </div>
    </>
  );
}

export default Controls