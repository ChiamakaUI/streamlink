// @ts-nocheck
"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BsPlusSquare } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import Modal from "./Modal";
import { createProduct } from "@/actions/product";
import ProductFormModal from "./ProductFormModal";
import ProductPreview from "./ProductPreview";

type ProductModalProps = {
  setShowModal: Function;
  meetingId: string;
};

type FormData = {
  name: string;
  description?: string | undefined;
  price: string;
};

type Product = {
  name: string;
  description?: string;
  price: number;
  image: string | null;
  streamType: string;
};

const schema = yup.object({
  streamType: yup.string().required("Please, choose your stream type"),
});

const ProductModal = ({ setShowModal, meetingId }: ProductModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [stage, setStage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [streamType, setStreamType] = useState<string>("");
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    setStreamType(data?.streamType);
     setStage(2);
  };


  console.log(products);

  const addProducts = async() => {
    const newProducts = products.map((product) => ({
      ...product,
      streamType: streamType,
      liveStreamName: `${meetingId}`,
      userId: currentUser.id,
    }));
    console.log(newProducts);
    await createProduct(newProducts);
    toast.success("Products Added")
    setShowModal(false)
  };

  const removeProduct = (productId: number) => {
    console.log(productId);
    const newProducts = products.filter((_, i) => i !== productId);

    console.log(newProducts);
    setProducts(newProducts);
  };

  console.log({ products });

  return (
    <>
      <Modal bgColor={"bg-modal-black"}>
        <div className="bg-white w-full absolute bottom-0 p-5 text-black rounded-t-3xl">
          <div
            className="bg-[#EAEAEA] rounded-full ml-auto w-[25px] h-[25px] p-1.5 flex flex-col items-center cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            <IoMdClose className="text-black text-base cursor-pointer" />
          </div>
          {stage === 1 ? (
            <div className="p-3">
              <p className="font-semibold text-lg">Product options</p>
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <label htmlFor="regular" className="my-1 flex flex-row">
                  <input
                    type="radio"
                    name="stream_type"
                    value="sale"
                    className="mr-2"
                    {...register("streamType")}
                  />
                  Sale
                </label>
                <label htmlFor="auction" className="flex flex-row">
                  <input
                    type="radio"
                    name="stream_type"
                    value="auction"
                    className="mr-2"
                    {...register("streamType")}
                  />
                  Auction
                </label>
                <p className="text-red-500 text-sm">
                  {errors.streamType?.message}
                </p>
                <button className="text-black bg-[#EDF042] rounded-lg mx-auto px-3.5 py-2 w-full font-semibold mt-3">
                  Continue
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center p-3">
              {products.length === 0 ? (
                <p className="text-lg">No product added yet</p>
              ) : (
                <div className="w-full flex flex-col items-center">
                  {products.map((product, i) => (
                    <ProductPreview
                      product={product}
                      key={i}
                      removeFunc={removeProduct}
                      productId={i}
                      type="vendor"
                    />
                  ))}
                </div>
              )}
              <button
                onClick={() => setShowFormModal(true)}
                className="text-black border-2 border-[#EDF042] rounded-lg py-2.5 w-full font-semibold mt-3"
              >
                <div className="flex flex-row items-center w-[45%] mx-auto">
                  <BsPlusSquare className="text-xl mr-1.5 font-semibold" />
                  <span>Add Products</span>
                </div>
              </button>
              {products.length !== 0 && (
                <button
                  onClick={addProducts}
                  className="text-black bg-[#EDF042] rounded-lg py-2.5 w-full font-semibold mt-3 text-center"
                >
                  Continue
                </button>
              )}
            </div>
          )}
        </div>
      </Modal>
      {showFormModal && (
        <ProductFormModal
          setShowModal={setShowFormModal}
          setProducts={setProducts}
        />
      )}
      <Toaster />
    </>
  );
};

export default ProductModal;
