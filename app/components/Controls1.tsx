"use client"

import { useMeeting } from "@videosdk.live/react-sdk";
import { FaPlus } from "react-icons/fa";

const Controls = () => {
    const { leave, toggleMic, toggleWebcam, startHls, stopHls, hlsState } =
    useMeeting();

  return (
    <>
      <div className="absolute z-50 top-0 flex flex-col right-0">

        <div className="">
        <button>
<FaPlus className=""/>

        </button>
        Add
        </div>

      </div>
    </>
  );
}

export default Controls

        {/* <button onClick={() => leave()}>Leave</button> */}
        {/* <button onClick={() => toggleMic()}>toggleMic</button>
        <button onClick={() => toggleWebcam()}>toggleWebcam</button> */}
        {/* <button
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
        <button onClick={() => stopHls()}>Stop HLS</button> */}