"use client"

import { FaPlus } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";

const Controls = () => {
  return (
    <div className="absolute right-5 bottom-1/2 flex flex-col items-center z-50">
    <div className="flex flex-col items-center">
      <button className="bg-[#FFFFFF1A] rounded-full p-3">
        <FaPlus className="text-2xl" />
      </button>
      Add
    </div>

    <div className="flex flex-col items-center my-2.5">
      <button className="bg-[#FFFFFF1A] rounded-full p-3">
        <IoIosShareAlt className="text-2xl" />
      </button>
      Share
    </div>
  </div>
  )
}

export default Controls