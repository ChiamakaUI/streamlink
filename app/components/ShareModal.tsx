"use client";

import { IoMdClose } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";
import { FaXTwitter, FaFacebook, FaTiktok } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { TbCopy } from "react-icons/tb";
import Modal from "./Modal";

type ShareModalProps = {
  setShowModal: Function;
  meetingId: string;
};

const ShareModal = ({ setShowModal, meetingId }: ShareModalProps) => {

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied");
    } catch (error: any) {
      console.error(error.message);
    }
  };
  
  return (
    <>
      <Modal bgColor={"bg-modal-black"}>
        <div className="bg-white w-[72%] mx-auto rounded-xl p-5 text-black my-28">
          <div className="flex flex-row justify-between items-center mb-4">
            <p className="text-xl text-[#484848] font-semibold">Share</p>
            <div
              className="bg-[#EAEAEA] rounded-full ml-auto p-1.5 flex flex-col items-center cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              <IoMdClose className="text-black text-xl cursor-pointer font-bold" />
            </div>
          </div>
          <div className="flex flex-row justify-between items-center my-3.5 w-full">
            <button className="bg-[#EAEAEA] rounded-full p-3">
              <FaXTwitter className="text-xl" />
            </button>
            <button className="bg-[#EAEAEA] rounded-full p-3">
              <FaFacebook className="text-xl" />
            </button>
            <button className="bg-[#EAEAEA] rounded-full p-3">
              <AiFillInstagram className="text-xl" />
            </button>
            <button className="bg-[#EAEAEA] rounded-full p-3">
              <FaTiktok className="text-xl" />
            </button>
          </div>
          <div className="flex flex-col">
            <p className="text-[#484848]">Copy Link</p>
            <div className="bg-[#EAEAEA] flex flex-row items-center rounded-md mt-3 p-2 justify-between">
              <p className="text-sm truncate">{`${window.location.hostname}/${meetingId}?mode=VIEWER`}</p>
              <TbCopy
                className="text-[#8C8C8C] text-3xl font-semibold"
                onClick={() =>
                  copyText(
                    `${window.location.hostname}/${meetingId}?mode=VIEWER`
                  )
                }
              />
            </div>
          </div>
        </div>
      </Modal>
      <Toaster />
    </>
  );
};

export default ShareModal;
