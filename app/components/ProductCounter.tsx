"use client";
import { useState } from "react";
import { io } from "socket.io-client";
import { FaPlus, FaMinus } from "react-icons/fa";


type ProductCounterProps = {
  price: number;
  productId: string;
};

type Bid = {
  productId: string;
  userId: string;
  price: number;
};

const ProductCounter = ({ price, productId }: ProductCounterProps) => {

  const [count, setCount] = useState<number>(price);
  const [showButton, setShowButton] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const socket = io("http://localhost:3000");

  socket.on("connect", () => {
    console.log(socket.id);
  });
  
  const sendBid = (data: Bid) => {
    socket.emit("bids", data);
    console.log("Bid sent");
  };

  const increaseBid = () => {
    setCount((prev) => prev + 50);
    setShowButton(true);
  };

  const decreaseBid = () => {
    if (count === price) return;

    setCount((prev) => prev - 50);
  };

  const bid = {
    productId,
    userId: currentUser.id,
    price: count,
  };
  
  return (
    <div className="flex flex-col gap-y-2 items-center">
      <div className="bg-[#EDF042] flex flex-row justify-between items-center mx-auto w-[100px] gap-x-2 text-black font-semibold p-2 box-border rounded-xl">
        <FaPlus className="text-xs" onClick={increaseBid} />
        <p className="text-xs">{count}</p>
        <FaMinus className="text-xs" onClick={decreaseBid} />
      </div>
      {showButton && (
        <button className="bg-[#EDF042] p-2 rounded-xl text-xs font-semibold box-border w-[100px]" onClick={() => sendBid(bid)}>
          Bid
        </button>
      )}
    </div>
  );
};

export default ProductCounter;
// w-[45%]
