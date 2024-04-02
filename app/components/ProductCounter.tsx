"use client";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

type ProductCounterProps = {
  price: number;
};

const ProductCounter = ({ price }: ProductCounterProps) => {
  console.log({price})
  const [count, setCount] = useState<number>(price);

  const increaseBid = () => {
    setCount((prev) => prev + 10);
  };

  const decreaseBid = () => {
    if (count === price) return;

    setCount((prev) => prev - 10);
  };

  return (
    <div className="bg-[#EDF042] flex flex-row justify-between items-center mx-auto w-[45%] text-black font-semibold p-2.5 rounded-xl">
      <FaPlus className="" onClick={increaseBid} />
      <p className="">{count}</p>
      <FaMinus className="" onClick={decreaseBid} />
    </div>
  );
};

export default ProductCounter;
