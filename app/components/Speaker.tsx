"use client";

import { useMemo, useState } from "react";
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import Controls from "./Controls";
import Participant from "./Participant";
import ProductModal from "./ProductModal";

const Speaker = () => {
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

  return (
    <>
      <div>
        {/* <p>Current HLS State: {hlsState}</p> */}
        <div>
          <button onClick={() => setShowModal(true)}>Add products</button>
        </div>
        {/* <Controls />
      {speakers.map((participant) => (
        <Participant participantId={participant.id} key={participant.id} />
      ))} */}
      </div>
      {showModal && (
        <ProductModal setShowModal={setShowModal} />
      )}
    </>
  );
};

export default Speaker;
