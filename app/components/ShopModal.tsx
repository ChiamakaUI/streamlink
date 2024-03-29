// @ts-nocheck
"use client";

import { IoMdClose } from "react-icons/io";
import Modal from "./Modal";
import ProductPreview from "./ProductPreview";

type ShopModalProps = {
  setShowModal: Function;
  // meetingId: string;
  products: any;
};

const ShopModal = ({ setShowModal, products }: ShopModalProps) => {
  return (
    <Modal bgColor={"bg-modal-black"}>
      <div className="bg-white w-full absolute bottom-0 p-5 text-black rounded-t-3xl">
        <div
          className="bg-red-600 rounded-full ml-auto w-[25px] h-[25px] p-1.5 flex flex-col items-center cursor-pointer mb-4"
          onClick={() => setShowModal(false)}
        >
          <IoMdClose className="text-white text-base cursor-pointer" />
        </div>
        <div className="">
          {products.map((product) => (
            <ProductPreview key={product.id} product={product} type="buyer" />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default ShopModal;
