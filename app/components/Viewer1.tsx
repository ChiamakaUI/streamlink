"use client"

import { useEffect, useMemo, useRef, useState } from "react";

import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  Constants,
} from "@videosdk.live/react-sdk";
import Hls from "hls.js";

const Viewer = () => {

  const playerRef = useRef<HTMLVideoElement>(null);

   const { hlsUrls, hlsState } = useMeeting();

   useEffect(() => {
     if (hlsUrls.downstreamUrl && hlsState == "HLS_PLAYABLE") {
       if (Hls.isSupported()) {
         const hls = new Hls({
           capLevelToPlayerSize: true,
           maxLoadingDelay: 4,
           minAutoBitrate: 0,
           autoStartLoad: true,
           defaultAudioCodec: "mp4a.40.2",
         });
         let player: HTMLMediaElement = document.querySelector("#hlsPlayer")!;
         hls.loadSource(hlsUrls.downstreamUrl);
        //  hls.attachMedia(player);
        hls.attachMedia(player);
       } else {
         if (typeof playerRef.current?.play === "function") {
           playerRef.current.src = hlsUrls.downstreamUrl;
           playerRef.current.play();
         }
       }
     }
   }, [hlsUrls, hlsState])
   
   return (
     <div>
       {/* Showing message if HLS is not started or is stopped by HOST */}
       {hlsState != "HLS_PLAYABLE" ? (
         <div>
           <p>Please Click Go Live Button to start HLS</p>
         </div>
       ) : (
         hlsState == "HLS_PLAYABLE" && (
           <div>
             <video
               ref={playerRef}
               id="hlsPlayer"
               autoPlay={true}
               controls
               style={{ width: "50%", height: "50%" }}
               playsInline
               muted={true}
               onError={(err) => {
                 console.log(err, "hls video error");
               }}
             ></video>
           </div>
         )
       )}
     </div>
   );
}

export default Viewer
