"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { BsPlusSquare } from "react-icons/bs";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import axios from "axios";
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

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [file, setFile] = useState(null);
  const [stage, setStage] = useState(1);
  const [products, setProducts] = useState<Product[]>([
    {
      image:
        "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
      name: "ffff",
      price: 500,
      streamType: "auction",
      liveStreamName: `${meetingId}`,
      userId: currentUser.id,
    },
    {
      image:
        "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
      name: "ccccc",
      price: 700,
      streamType: "auction",
      liveStreamName: `${meetingId}`,
      userId: currentUser.id,
    },
    {
      image:
        "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
      name: "bbbb",
      price: 300,
      streamType: "auction",
      liveStreamName: `${meetingId}`,
      userId: currentUser.id,
    },
    {
      image:
        "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
      name: "aaaaa",
      price: 800,
      streamType: "auction",
      liveStreamName: `${meetingId}`,
      userId: currentUser.id,
    },
    {
      image:
        "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
      name: "hhhh",
      price: 500,
      streamType: "auction",
      liveStreamName: `${meetingId}`,
      userId: currentUser.id,
    },
  ]);
  const [showFormModal, setShowFormModal] = useState(false);
  // const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  // const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)
  const onSubmit: SubmitHandler<FormData> = (data) => {
    // console.log(data);
    // if (!file) {
    //   toast.error("Please, add an image to continue");
    //   return;
    // }
    console.log(data);
    // setProducts((prev) => [...prev, { ...data, image: file }]);
    // setShowModal(false);
    setStage(2);
  };

  const handleChange = (e: any) => {
    console.log(e.target.files);
    // setFile(URL.createObjectURL(e.target.files[0]));
    uploadImage(e.target.files[0]);
  };

  const uploadImage = async (file: any) => {
    // const preset_key = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_KEY
    // const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const preset_key = "yberuuyv";
    const cloudName = "adaeze";

    const image = file;

    try {
      if (image && preset_key && cloudName) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", preset_key);

        await axios
          .post(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
          )
          .then((res) => {
            console.log("Image: ", res.data.url);
            setFile(res?.data?.secure_url);
          })
          .catch((err) => console.log(err));
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(products);

  const uploadProduct = () => {
    setStage(2);
    if (stage === 2 || products?.length === 0) {
      toast.error("Please add products to continue");
      return;
    }
    setStage(3);
  };

  const newProducts = [
    {
      image:
        "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
      name: "ffff",
      price: 500,
      streamType: "auction",
      liveStreamName: `${meetingId}`,
      userId: currentUser.id,
    },
    {
      image:
        "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
      name: "ccccc",
      price: 700,
      streamType: "auction",
      liveStreamName: `${meetingId}`,
      userId: currentUser.id,
    },
    {
      image:
        "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
      name: "bbbb",
      price: 300,
      streamType: "auction",
      liveStreamName: `${meetingId}`,
      userId: currentUser.id,
    },
    {
      image:
        "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
      name: "aaaaa",
      price: 800,
      streamType: "auction",
      liveStreamName: `${meetingId}`,
      userId: currentUser.id,
    },
    {
      image:
        "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
      name: "hhhh",
      price: 500,
      streamType: "auction",
      liveStreamName: `${meetingId}`,
      userId: currentUser.id,
    },
  ];

  const addProducts = () => {
    createProduct(newProducts);
  };

  const removeProduct = (productId) => {
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
          ) : stage === 2 ? (
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
                  // onClick={() => setShowFormModal(true)}
                  className="text-black bg-[#EDF042] rounded-lg py-2.5 w-full font-semibold mt-3 text-center"
                >
                  Continue
                </button>
              )}
            </div>
          ) : (
            <div>
              <p>start there</p>
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

{
  /* <div className="mx-auto w-[150px] my-3 border">
            <button
              className="py-1.5 px-5 border bg-[#3B5390] text-white rounded-md"
              onClick={uploadProduct}
            >
              {stage === 3 ? "Complete" : "Continue"}
            </button>
          </div> */
}

{
  /* <p className="text-red-600 text-xl">{stage}</p>
          <button onClick={addProducts}>Add Products to DB</button> */
}
