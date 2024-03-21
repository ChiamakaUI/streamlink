"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";

import { useForm, SubmitHandler  } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import axios from "axios";
import Modal from "./Modal";
import { createProduct } from "@/actions/product";

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
  price: string;
  image: string | null;
};

const schema = yup.object({
  name: yup.string().required("Please, provide product name"),
  description: yup.string(),
  price: yup.string().required("Please, provide product price"),
});

const ProductModal = ({ setShowModal, meetingId }: ProductModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [file, setFile] = useState(null);
  const [stage, setStage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  // const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data)
  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    if (!file) {
      toast.error("Please, add an image to continue");
      return;
    }
    console.log(data);
    setProducts((prev) => [...prev, { ...data, image: file }]);
    setShowModal(false);
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
      image: "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
      name: "ffff",
      price: 500,
      streamType: "auction",
      liveStreamName: `${meetingId}`,
      userId: currentUser.id
    },
    {
      image: "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
      name: "ccccc",
      price: 700,
      streamType: "auction",
      liveStreamName: `${meetingId}`,
      userId: currentUser.id
    },
    {
      image: "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
      name: "bbbb",
      price: 300,
      streamType: "auction",
      liveStreamName: `${meetingId}`,
      userId: currentUser.id
    },
    {
      image: "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
      name: "aaaaa",
      price: 800,
      streamType: "auction",
      liveStreamName: `${meetingId}`,
      userId: currentUser.id
    },
    {
      image: "https://res-console.cloudinary.com/adaeze/thumbnails/v1/image/upload/v1709719036/bml0N3MzeGR0bnlzenhxMnRybW0=/grid_landscape",
      name: "hhhh",
      price: 500,
      streamType: "auction",
      liveStreamName: `${meetingId}`,
      userId: currentUser.id
    }
  ]

  const addProducts = () => {
    createProduct(newProducts)
  }
  return (
    <>
      <Modal bgColor={"bg-modal-black"}>
        <div className="bg-white w-full absolute bottom-0 p-5 text-black rounded-t-3xl">
          <div
            className="bg-red-600 rounded-full ml-auto w-[25px] h-[25px] p-1.5 flex flex-col items-center cursor-pointer"
            onClick={() => setShowModal(false)}
          >
            <IoMdClose className="text-white text-base cursor-pointer" />
          </div>
          <p className="text-red-600 text-xl">{stage}</p>
          <button onClick={addProducts}>Add Products to DB</button>
          {stage === 1 ? (
            <div>
              <p>start there</p>
            </div>
          ) : stage === 2 ? (
            <div>
              </div>
          ) : (
            <div>
              <p>start there</p>
            </div>
          )}
          <div className="mx-auto w-[150px] my-3 border">
            <button
              className="py-1.5 px-5 border bg-[#3B5390] text-white rounded-md"
              onClick={uploadProduct}
            >
              {stage === 3 ? "Complete" : "Continue"}
            </button>
          </div>
        </div>
      </Modal>
      <Toaster />
    </>
  );
};

export default ProductModal;
