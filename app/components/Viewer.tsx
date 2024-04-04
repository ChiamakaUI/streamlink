"use client";

import { useEffect, useRef, useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
// import { getProductsByAuction } from "@/actions/product";
// import { io } from "socket.io-client";
// import ProductCard from "./ProductCard";
import WaitRoom from "./WaitRoom"
import Controls from "./Controls";
import CallMeta from "./CallMeta";
import Hls from "hls.js";
// import { getCurrentProduct } from "@/actions/product";

type ViewerProps = {
  meetingId: string;
};

// type Product = {
//   id: string;
//   image: string;
//   name: string;
//   userId: string;
//   price: number;
//   streamType: string;
//   description: string | null;
//   liveStreamName: string;
// };



const Viewer = ({ meetingId }: ViewerProps) => {
  // States to store downstream url and current HLS state
  // const [product, setProduct] = useState<Product>();
  const playerRef = useRef<HTMLVideoElement>(null);
  const { hlsUrls, hlsState } = useMeeting();

  useEffect(() => {
    if (hlsUrls.downstreamUrl && hlsState === "HLS_PLAYABLE") {
      if (Hls.isSupported()) {
        const hls = new Hls({
          maxLoadingDelay: 1, // max video loading delay used in automatic start level selection
          defaultAudioCodec: "mp4a.40.2", // default audio codec
          maxBufferLength: 0, // If buffer length is/become less than this value, a new fragment will be loaded
          maxMaxBufferLength: 1, // Hls.js will never exceed this value
          startLevel: 0, // Start playback at the lowest quality level
          startPosition: -1, // set -1 playback will start from intialtime = 0
          maxBufferHole: 0.001, // 'Maximum' inter-fragment buffer hole tolerance that hls.js can cope with when searching for the next fragment to load.
          highBufferWatchdogPeriod: 0, // if media element is expected to play and if currentTime has not moved for more than highBufferWatchdogPeriod and if there are more than maxBufferHole seconds buffered upfront, hls.js will jump buffer gaps, or try to nudge playhead to recover playback.
          nudgeOffset: 0.05, // In case playback continues to stall after first playhead nudging, currentTime will be nudged evenmore following nudgeOffset to try to restore playback. media.currentTime += (nb nudge retry -1)*nudgeOffset
          nudgeMaxRetry: 1, // Max nb of nudge retries before hls.js raise a fatal BUFFER_STALLED_ERROR
          maxFragLookUpTolerance: 0.1, // This tolerance factor is used during fragment lookup.
          liveSyncDurationCount: 1, // if set to 3, playback will start from fragment N-3, N being the last fragment of the live playlist
          abrEwmaFastLive: 1, // Fast bitrate Exponential moving average half-life, used to compute average bitrate for Live streams.
          abrEwmaSlowLive: 3, // Slow bitrate Exponential moving average half-life, used to compute average bitrate for Live streams.
          abrEwmaFastVoD: 1, // Fast bitrate Exponential moving average half-life, used to compute average bitrate for VoD streams
          abrEwmaSlowVoD: 3, // Slow bitrate Exponential moving average half-life, used to compute average bitrate for VoD streams
          maxStarvationDelay: 1, // ABR algorithm will always try to choose a quality level that should avoid rebuffering
        });

        let player: HTMLMediaElement = document.querySelector("#hlsPlayer")!;

        hls.loadSource(hlsUrls.downstreamUrl);
        hls.attachMedia(player);
      } else {
        if (typeof playerRef.current?.play === "function") {
          playerRef.current.src = hlsUrls.downstreamUrl;
          playerRef.current.play();
        }
      }
    }
  }, [hlsUrls, hlsState]);


  return (
    <>
      {hlsState !== "HLS_PLAYABLE" ? (
        <WaitRoom />
      ) : (
        hlsState === "HLS_PLAYABLE" && (
          <div className="relative h-screen w-full">
            <CallMeta />
            <Controls meetingId={meetingId} type="buyer" />
            {/* <ProductCard bidFunc={sendBid} type="buyer" meetingId={meetingId}/> */}
            <video
              ref={playerRef}
              // src="https://www.youtube.com/watch?v=0yW2Qr5JOmc"
              id="hlsPlayer"
              autoPlay={true}
              controls
              style={{ width: "100%", height: "100%", position: "relative" }}
              playsInline
              muted={true}
              onError={(err) => {
                console.log(err, "hls video error");
              }}
            ></video>
          </div>
        )
      )}
    </>
  );
};

export default Viewer;
