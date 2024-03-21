"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { IoMdWallet } from "react-icons/io";
import UserProfileModal from "./UserProfileModal";
import ShareModal from "./ShareModal";
import { set } from "react-hook-form";

type ControlProps = {
  setShowProductModal?: Function;
  meetingId: string;
  type: string
};

const Controls = (props: ControlProps) => {
  const { setShowProductModal, meetingId, type } = props;
  const [showUserModal, setShowUserModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleProductModel = () => {
    if(setShowProductModal === undefined){
      return
    } else {
      setShowProductModal(true)
    }
  }

  return (
    <>
      <div className="absolute right-5 bottom-1/4 flex flex-col items-center z-50">
        {
          type === "vendor" && (
            <div
            className="flex flex-col items-center"
            onClick={handleProductModel}
          >
            <button className="bg-[#FFFFFF1A] rounded-full p-3">
              <FaPlus className="text-2xl" />
            </button>
            Add
          </div>
          )
        }
        <div
          className="flex flex-col items-center my-2.5"
          onClick={() => setShowShareModal(true)}
        >
          <button className="bg-[#FFFFFF1A] rounded-full p-3">
            <IoIosShareAlt className="text-2xl" />
          </button>
          Share
        </div>
        <div
          className="flex flex-col items-center"
          onClick={() => setShowUserModal(true)}
        >
          <button className="bg-[#FFFFFF1A] rounded-full p-3">
            <IoMdWallet className="text-2xl" />
          </button>
          Wallet
        </div>
      </div>
      {showShareModal && (
        <ShareModal setShowModal={setShowShareModal} meetingId={meetingId} />
      )}
      {showUserModal && <UserProfileModal setShowModal={setShowUserModal} />}
    </>
  );
};

export default Controls;
