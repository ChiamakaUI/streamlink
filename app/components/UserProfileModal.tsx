"use client";

import { IoMdClose } from "react-icons/io";
import { DynamicEmbeddedWidget } from "@dynamic-labs/sdk-react-core";
import Modal from "./Modal";

type UserProfileModalProps = {
  setShowModal: Function;
};

const UserProfileModal = (props: UserProfileModalProps) => {
  const { setShowModal } = props;
  return (
    <>
      <Modal bgColor={"bg-modal-black"}>
        <div className="bg-white w-full absolute bottom-0 p-5 text-black rounded-t-3xl">
          <div
            className="bg-red-600 rounded-full ml-auto w-[25px] h-[25px] p-1.5 flex flex-col items-center cursor-pointer mb-4"
            onClick={() => setShowModal(false)}
          >
            <IoMdClose className="text-white text-base cursor-pointer" />
          </div>
          <DynamicEmbeddedWidget background="with-border" />
        </div>
      </Modal>
    </>
  );
};

export default UserProfileModal;
