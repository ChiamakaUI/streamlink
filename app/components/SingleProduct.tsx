"use client";

import ProductCounter from "./ProductCounter";

export type Product = {
  image: string;
  name: string;
  price: number;
  streamType: string;
  liveStreamName: string;
  userId: string;
  id: string;
  auctionEnded?: Date | null;
  auctionStarted?: Date | null;
  description?: string | null;
};

type SingleProductProps = {
  product: Product;
  type: string;
};

const SingleProduct = ({ product, type }: SingleProductProps) => {
  return (
    <div className="flex flex-row items-center justify-between my-2 w-full border-b p-2 border-[#B4B4B4]">
      <div className="flex flex-row items-center justify-between">
        <img
          src={product.image}
          alt={product.name}
          className="w-[78px] h-[78px] rounded-lg border mr-4"
        />
        <div className="flex flex-col border">
          <p>{product.name}</p>
          <p>{product.description}</p>
          <p>{product.price}</p>
        </div>
      </div>
      {(type === "buyer" && product.streamType === "auction") && (
        <ProductCounter price={product?.price} productId={product.id} />
      )}
      {(type === "buyer" && product.streamType === "sale") && (
        <button className="bg-[#EDF042] p-2 rounded-xl text-xs font-semibold box-border w-[100px]">
          Buy
        </button>
      )}
    </div>
  );
};

export default SingleProduct;
