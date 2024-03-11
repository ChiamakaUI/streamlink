"use client"

import { useEffect, useMemo, useRef, useState } from "react";
import {
    MeetingProvider,
    useMeeting,
    useParticipant,
    Constants,
  } from "@videosdk.live/react-sdk";
import Controls from "./Controls1"
import Participant from "./Participant1"

const Speaker = () => {
    const [joined, setJoined] = useState<string | undefined>();
    const { participants } = useMeeting();
    const mMeeting = useMeeting({
      onMeetingJoined: () => {
        setJoined("JOINED");

        if (mMeetingRef.current.localParticipant.mode == "CONFERENCE") {
          mMeetingRef.current.localParticipant.pin("CAM");
        }
      },
  });

  const mMeetingRef = useRef(mMeeting);
  
  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);


  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode == Constants.modes.CONFERENCE;
      }
    );
    return speakerParticipants;
  }, [participants]);
  return (
    <div className="container">
      {joined && joined == "JOINED" ? (
        <div>
          {speakers.map((participant) => (
            <Participant
              participantId={participant.id}
              key={participant.id}
            />
          ))}
          <Controls />
        </div>
      ) : (
        <p>Joining the meeting...</p>
      )}
    </div>
  );
}

export default Speaker
