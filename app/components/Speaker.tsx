"use client";

import { useMemo, useState } from "react";
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import Controls from "./Controls";
import Participant from "./Participant";
import ProductModal from "./ProductModal";
import { startAuction } from "@/actions/auction";

type SpeakerProps = {
  meetingId: string
}

const Speaker = ({ meetingId }: SpeakerProps) => {
  const { participants } = useMeeting();
  const [showModal, setShowModal] = useState(false);

  console.log(participants);
  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode == Constants.modes.CONFERENCE;
      }
    );
    return speakerParticipants;
  }, [participants]);

  const start = () => {
    console.log("hello start")
    startAuction(`${meetingId}`)
  }
  return (
    <>
      <div>
        {/* <p>Current HLS State: {hlsState}</p> */}
        <div className="border my-4">
          <button onClick={() => setShowModal(true)}>Add products</button>
        </div>
        <div className="border my-4 bg-black text-red-600">
          <button onClick={start}>start auction</button>
        </div>
        <Controls />
      {speakers.map((participant) => (
        <Participant participantId={participant.id} key={participant.id} />
      ))}
      </div>
      {showModal && (
        <ProductModal setShowModal={setShowModal} meetingId={meetingId}/>
      )}
    </>
  );
};

export default Speaker;
