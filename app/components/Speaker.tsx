"use client";

import { useMemo, useState } from "react";
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import { MdCallEnd } from "react-icons/md";
import Controls from "./Controls";
import CallMeta from "./CallMeta";
import Participant from "./Participant";
import ProductModal from "./ProductModal";
import ProductCard from "./ProductCard";

type SpeakerProps = {
  meetingId: string;
};

const Speaker = ({ meetingId }: SpeakerProps) => {
  const { participants, startHls, hlsState, stopHls } = useMeeting();
  const [showProductModal, setShowProductModal] = useState(false);

  console.log(participants);
  // console.log(participants.size);
  const speakers = useMemo(() => {
    const speakerParticipants = [...participants.values()].filter(
      (participant) => {
        return participant.mode == Constants.modes.CONFERENCE;
      }
    );
    return speakerParticipants;
  }, [participants]);

  const testProduct = {
    image: "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
    name: "string",
    price: 180,
    id: "234"
  }
  
  return (
    <>
      <div className="relative h-screen w-full">
        <CallMeta />
        <Controls
          setShowProductModal={setShowProductModal}
          meetingId={meetingId}
          type="vendor"
        />
        <ProductCard product={testProduct} bidFunc={() => console.log('hyyyy')} type="vendor"/>
        {speakers.map((participant) => (
          <Participant participantId={participant.id} key={participant.id} />
        ))}
        {"HLS_STOPPED" === "HLS_STOPPED" ? (
          <div className="relative bottom-16 w-full bg-modal-black flex flex-col items-center p-3">
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
          </div>
        ) : (
          <div className="relative bottom-20 w-full bg-modal-black flex flex-col items-center p-3">
            <button
              onClick={() => stopHls()}
              className="text-white bg-red-600 mx-auto p-3 rounded-full flex flex-col items-center "
            >
              <MdCallEnd className="text-3xl text-white" />
            </button>
          </div>
        )}
      </div>
      {showProductModal && (
        <ProductModal
          setShowModal={setShowProductModal}
          meetingId={meetingId}
        />
      )}
    </>
  );
};

export default Speaker;

{
  /* <p>Current HLS State: {hlsState}</p> */
}
{
  /* <div className="border my-4">
          <button onClick={() => setShowModal(true)}>Add products</button>
        </div> */
}
{
  /* <div className="border my-4 bg-black text-red-600">
          <button onClick={start}>start auction</button>
        </div> */
}
