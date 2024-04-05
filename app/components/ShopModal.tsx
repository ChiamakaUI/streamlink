"use client";

import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { getProductsByStream } from "@/actions/product";
import Modal from "./Modal";
import SingleProduct, { Product } from "./SingleProduct";

type ShopModalProps = {
  setShowModal: Function;
  meetingId: string;
  type: string;
};

const ShopModal = ({ setShowModal, meetingId, type }: ShopModalProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getStreamProducts = async () => {
      const products = await getProductsByStream(`${meetingId}`);
      console.log(products);
      setProducts(products);
    };

    getStreamProducts();
  }, [meetingId]);

  // console.log({ products });
  return (
    <Modal bgColor={"bg-modal-black"}>
      <div className="bg-white w-full absolute bottom-0 p-3 text-black rounded-t-3xl max-h-[60%]">
        <div
          className="bg-red-600 rounded-full ml-auto w-[25px] h-[25px] p-1.5 flex flex-col items-center cursor-pointer mb-4"
          onClick={() => setShowModal(false)}
        >
          <IoMdClose className="text-white text-base cursor-pointer" />
        </div>
        {products.length === 0 ? (
          <div className="text-center w-[80%] mx-auto">
            <p className="font-semibold">No products has been added to this stream</p>
          </div>
        ) : (
          <div className="h-full overflow-y-scroll">
            {products.map((product) => (
              <SingleProduct key={product.id} product={product} type={type} />
            ))}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ShopModal;
