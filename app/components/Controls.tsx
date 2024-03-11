"use client"

import { useMeeting } from "@videosdk.live/react-sdk";

const Controls = () => {
    const { leave, toggleMic, toggleWebcam, startHls, stopHls, hlsState } =
    useMeeting();
//   const [hlsThumbnailImage, setHlsThumbnailImage] = useState(null);

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
        {(hlsState === "HLS_STARTED" || hlsState === "HLS_PLAYABLE") && (
          <>
            &emsp;|&emsp;
            {/* <button
              onClick={async () => {
                const { filePath, message } = await captureHLSThumbnail({
                  roomId: props.meetingId,
                });

                setHlsThumbnailImage({
                  imageLink: filePath,
                  message: message,
                });
              }}
            >
              Capture HLS Thumbnail
            </button> */}
          </>
        )}
      </div>
      {/* {hlsThumbnailImage && hlsThumbnailImage?.imageLink ? (
        <>
          <p>Captured HLS Thumbnail</p>
          <img
            src={hlsThumbnailImage?.imageLink}
            alt={"capture_image"}
            height={200}
            width={300}
          />
        </>
      ) : (
        hlsThumbnailImage && (
          <>
            <p>Error In Capture HLS Thumbnail</p>
            <p>{hlsThumbnailImage?.message}</p>
          </>
        )
      )} */}
    </>
  );
}

export default Controls