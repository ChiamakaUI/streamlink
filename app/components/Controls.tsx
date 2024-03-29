// @ts-nocheck
"use client";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { IoMdWallet } from "react-icons/io";
import { VscDebugStart } from "react-icons/vsc";
import { BsShop } from "react-icons/bs";
import { getProductsByAuction, getProductsByStream } from "@/actions/product";
import { startAuction } from "@/actions/auction";
import UserProfileModal from "./UserProfileModal";
import ShareModal from "./ShareModal";
import ShopModal from "./ShopModal";

type ControlProps = {
  setShowProductModal?: Function;
  meetingId: string;
  type: string;
};

const Controls = (props: ControlProps) => {
  const { setShowProductModal, meetingId, type } = props;
  const [showUserModal, setShowUserModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showShopModal, setShowShopModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [streamProducts, setStreamProducts] = useState([])

  const handleProductModel = () => {
    if (setShowProductModal === undefined) {
      return;
    } else {
      setShowProductModal(true);
    }
  };

  useEffect(() => {
    const getAuctionProducts = async () => {
      const products = await getProductsByAuction(`${meetingId}`);
      console.log(products);
      setProducts(products);
    };

    getAuctionProducts();
  }, [meetingId]);

  useEffect(() => {
    const getStreamProducts = async () => {
      const products = await getProductsByStream(`${meetingId}`);
      console.log(products);
      setStreamProducts(products);
    };

    getStreamProducts();
  }, [meetingId]);

  const start = () => {
    console.log("hello start");
    startAuction(`${meetingId}`);
  };
  
  return (
    <>
      <div className="absolute right-5 bottom-1/4 flex flex-col items-center z-50">
        {(type === "vendor" && streamProducts.length === 0) && (
          <div
            className="flex flex-col items-center"
            onClick={handleProductModel}
          >
            <button className="bg-[#FFFFFF1A] rounded-full p-3">
              <FaPlus className="text-2xl" />
            </button>
            Add
          </div>
        )}
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
          className="flex flex-col items-center mb-2.5"
          onClick={() => setShowUserModal(true)}
        >
          <button className="bg-[#FFFFFF1A] rounded-full p-3">
            <IoMdWallet className="text-2xl" />
          </button>
          Wallet
        </div>
        <div
          className="flex flex-col items-center mb-2.5"
          onClick={() => setShowShopModal(true)}
        >
          <button className="bg-[#FFFFFF1A] rounded-full p-3">
            <BsShop className="text-2xl" />
          </button>
          Shop
        </div>
        
        <div
          className="flex flex-col items-center"
          onClick={start}
        >
          <button className="bg-[#FFFFFF1A] rounded-full p-3">
            <VscDebugStart className="text-2xl" />
          </button>
          Start
        </div>
      </div>
      {showShopModal && <ShopModal setShowModal={setShowShopModal} products={streamProducts} />}
      {showShareModal && (
        <ShareModal setShowModal={setShowShareModal} meetingId={meetingId} />
      )}
      {showUserModal && <UserProfileModal setShowModal={setShowUserModal} />}
    </>
  );
};

export default Controls;
