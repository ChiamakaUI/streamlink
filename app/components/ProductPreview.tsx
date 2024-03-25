// @ts-nocheck
import { FaRegTrashCan } from "react-icons/fa6";
import { BiEdit } from "react-icons/bi";
import { FcLike } from "react-icons/fc";

type ProductPreviewProps = {
  product: any;
  productId: string;
  removeFunc: Function;
};

const ProductPreview = ({ product, productId, removeFunc, type }) => {
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
          <p>{product.productDesc}</p>
          <p>{product.price}</p>
        </div>
      </div>
      {type === "vendor" ? (
        <div className="flex flex-row items-center justify-between w-[16%]">
          <BiEdit className="text-2xl" />
          <FaRegTrashCan
            className="text-red-600 text-xl cursor-pointer"
            onClick={() => removeFunc(productId)}
          />
        </div>
      ) : (
        <div className="">
          <FcLike className="" />
        </div>
      )}
    </div>
  );
};

export default ProductPreview;
