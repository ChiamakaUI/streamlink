"use client"

import { useMeeting } from "@videosdk.live/react-sdk";
import { FaCircle } from "react-icons/fa";

const CallMeta = () => {

  const { participants } = useMeeting();

  return (
    <div className="absolute z-50 top-0 flex flex-row justify-between items-center w-full p-3.5 box-border bg-call-meta">
      <button className="border border-[#E85F5F] text-2xl px-4 py-1.5 rounded-lg">
      00:00
      </button>
      <button className="border border-[#E85F5F] px-4 py-0.5 rounded-lg flex flex-row justify-between items-center">
        <FaCircle className="text-xs text-[#E85F5F] mr-1"/>
      {participants.size}
      </button>
    </div>
  )
}

export default CallMeta