"use client";

import { useRef, useEffect } from "react";
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import { io } from "socket.io-client";
import Viewer from "./Viewer";
import Speaker from "./Speaker";

type ContainerProps = {
  mode: "CONFERENCE" | "VIEWER" | undefined;
  meetingId: string
};

const Container = ({ mode, meetingId }: ContainerProps) => {

  const mMeeting = useMeeting({
    onParticipantModeChanged: (data) => {
      console.log("participantModeChanged", data);
    },
    onError: (error) => {
      alert(error.message);
    },
    onHlsStateChanged: (data) => {
      console.log("HLS State Changed", data);
    },
  });

  const mMeetingRef = useRef(mMeeting);
//   console.log(mMeeting)
// console.log(meetingId)

  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

//   useEffect(() => {
//     const socket = io();
// console.log("heyyy")
// // "http://localhost:4000"
//     socket.on("connect", () => {
//       console.log("Connected to WebSocket server");
//     });

//     socket.on("data", (data: any) => {
//       console.log("Received data:", data);
//       // toast.success(`Received payment from ${JSON.stringify(data.sender)}`);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);
  return (
    <div className="">

      {mode === Constants.modes.CONFERENCE ? (
        <Speaker meetingId={meetingId}/>
      ) : (
        <Viewer meetingId={meetingId}/>
      )}
    </div>
  );
};

export default Container;
