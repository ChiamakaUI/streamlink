"use client";
import { useMemo, useState, useEffect } from "react";
import { useMeeting, Constants } from "@videosdk.live/react-sdk";
import { MdCallEnd } from "react-icons/md";
// import { io } from "socket.io-client";
import Controls from "./Controls";
import CallMeta from "./CallMeta";
import Participant from "./Participant";
import ProductModal from "./ProductModal";
import ProductCard from "./ProductCard";
// import { getCurrentProduct } from "@/actions/product";

type SpeakerProps = {
  meetingId: string;
};

const Speaker = ({ meetingId }: SpeakerProps) => {
  const { participants, startHls, hlsState, stopHls } = useMeeting();
  const [showProductModal, setShowProductModal] = useState(false);
  // const [showCurrentProduct, setShowCurrentProduct] = useState(false)
  // const [product, setProduct] = useState([]);
  
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
  
  return (
    <>
      <div className="relative h-screen w-full">
        <CallMeta />
        <Controls
          setShowProductModal={setShowProductModal}
          meetingId={meetingId}
          type="vendor"
        />
        {/* {
          showCurrentProduct && (
            <ProductCard type="vendor" meetingId={meetingId}/>
          )
        } */}
        {speakers.map((participant) => (
          <Participant participantId={participant.id} key={participant.id} />
        ))}
        {hlsState === "HLS_STOPPED" ? (
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
  