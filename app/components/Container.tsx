"use client";

import { useRef, useEffect } from "react";
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import Viewer from "./Viewer";
import Speaker from "./Speaker";

type ContainerProps = {
  mode: "CONFERENCE" | "VIEWER" | undefined;
};

const Container = ({ mode }: ContainerProps) => {

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

  return (
    <div className="">

      {/* {mode === Constants.modes.CONFERENCE ? (
        <Speaker />
      ) : (
        <Viewer />
      )} */}
    </div>
  );
};

export default Container;
