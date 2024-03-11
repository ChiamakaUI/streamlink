"use client"

import { useMemo } from "react";
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import Controls from "./Controls";
import Participant from "./Participant";


const Speaker = () => {
  const { participants } = useMeeting();
  console.log(participants)
  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode == Constants.modes.CONFERENCE;
      }
    );
    return speakerParticipants;
  }, [participants]);

  return (
    <div>
      {/* <p>Current HLS State: {hlsState}</p> */}
      <div>
        <button>Add products</button>
      </div>
      <Controls />
      {speakers.map((participant) => (
        <Participant participantId={participant.id} key={participant.id} />
      ))}
    </div>
    )
};

export default Speaker;
