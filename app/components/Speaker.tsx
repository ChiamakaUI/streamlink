"use client";

import { useMemo, useState } from "react";
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import { MdCallEnd } from "react-icons/md";
import Controls from "./Controls";
import CallMeta from "./CallMeta"
import Participant from "./Participant";
import ProductModal from "./ProductModal";
import { startAuction } from "@/actions/auction";

type SpeakerProps = {
  meetingId: string;
};

const Speaker = ({ meetingId }: SpeakerProps) => {
  const { participants, startHls, hlsState, stopHls } = useMeeting();
  const [showModal, setShowModal] = useState(false);

  console.log(participants);
  console.log(participants.size);
  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode == Constants.modes.CONFERENCE;
      }
    );
    return speakerParticipants;
  }, [participants]);

  const start = () => {
    console.log("hello start");
    startAuction(`${meetingId}`);
  };
  return (
    <>
      <div className="relative h-screen w-full">
        {/* <p>Current HLS State: {hlsState}</p> */}
        {/* <div className="border my-4">
          <button onClick={() => setShowModal(true)}>Add products</button>
        </div> */}
        {/* <div className="border my-4 bg-black text-red-600">
          <button onClick={start}>start auction</button>
        </div> */}
        <CallMeta/>
        <Controls />
        {speakers.map((participant) => (
          <Participant participantId={participant.id} key={participant.id} />
        ))}

        <div className="relative bottom-16 w-full bg-modal-black flex flex-col items-center p-3">
          {hlsState === "HLS_STOPPED" ? (
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
              className="text-black bg-[#EDF042] rounded-lg mx-auto px-3.5 py-2 w-[65%] font-semibold"
            >
              Start stream
            </button>
          ) : (
            <button
              onClick={() => stopHls()}
              className="text-white bg-red-600 mx-auto p-3 rounded-full flex flex-col items-center "
            >
              <MdCallEnd className="text-3xl text-white"/>
            </button>
          )}
        </div>
      </div>
      {showModal && (
        <ProductModal setShowModal={setShowModal} meetingId={meetingId} />
      )}
    </>
  );
};

export default Speaker;
