"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";
import axios from "axios";
import Modal from "./Modal";

type ProductModalProps = {
    setShowModal: Function;
}

type FormData = {
    name: string;
    description: string;
    price: string;
  };

type Product = {
    name: string;
    description: string;
    price: string;
    image: string;
}

const schema = yup.object({
  name: yup.string().required("Please, provide product name"),
  description: yup.string(),
  price: yup.string().required("Please, provide product price"),
});

const ProductModal = ({ setShowModal }: ProductModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [file, setFile] = useState(null);
  const [products, setProducts] = useState<Product[]>();

  const onSubmit = (data: FormData) => {
    console.log(data);
    if (!file) {
      toast.error("Please, add an image to continue");
      return;
    }
    console.log(data);
    setProducts((prev) => [...prev, { ...data, productImage: file }]);
    setShowModal(false);
  };

  const handleChange = (e) => {
    console.log(e.target.files);
    // setFile(URL.createObjectURL(e.target.files[0]));
    uploadImage(e.target.files[0])
  };

  const uploadImage = async (file) => {
    // const preset_key = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_KEY
    // const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    const preset_key = "yberuuyv"
    const cloudName = "adaeze"

    const image = file;
    
    try{
        if (image && preset_key && cloudName) {
            const formData = new FormData();
            formData.append("file", image)
            formData.append("upload_preset", preset_key)
            
         await axios.post(
                `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, 
                formData
            )
            .then(res => {
                console.log("Image: ",res.data.url);
                setFile(res?.data?.secure_url)
            })
            .catch(err => console.log(err))   
    
        };
    } catch(error){
        console.log(error)            
    }        
}

  return (
    <>
      <Modal bgColor={"bg-modal-black"}>
        <div className="bg-white w-[35%] mx-auto my-8 p-5 rounded-lg">
          <div
            className="bg-red-600 rounded-full ml-auto w-[25px] h-[25px] p-1.5 flex flex-col items-center"
            onClick={() => setShowModal(false)}
          >
            <IoMdClose className="text-white text-base cursor-pointer" />
          </div>

          <label>
            <input type="file" onChange={handleChange} className="hidden" />
            {file ? (
              <div className="w-[120px] rounded-lg">
                <img
                  src={file}
                  alt=""
                  className="w-full object-contain rounded-lg"
                />
              </div>
            ) : (
              <div className="border bg-[#DCDCDC] h-[60px] w-[85px] rounded-lg flex flex-col items-center">
                <IoCameraOutline className="text-5xl my-auto" />
              </div>
            )}
          </label>

          <form className="my-6 w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-full">
              <label className="text-lg">Product name:</label> <br />
              <input
                type="text"
                className="border border-[#ccc] w-full p-2 focus:outline-none my-1.5 rounded-md"
                {...register("name")}
              />
              <p className="text-red-500">{errors.name?.message}</p>
            </div>
            <div className="w-full">
              <label className="text-lg">Product Description:</label> <br />
              <input
                type="text"
                className="border border-[#ccc] w-full p-2 focus:outline-none my-1.5 rounded-md"
                {...register("description")}
              />
              <p className="text-red-500">{errors.description?.message}</p>
            </div>
            <div className="w-full">
              <label className="text-lg">Product Price:</label> <br />
              <input
                type="text"
                className="border border-[#ccc] w-full p-2 focus:outline-none my-1.5 rounded-md"
                {...register("price")}
              />
              <p className="text-red-500">{errors.price?.message}</p>
            </div>
            <div className="mx-auto w-[150px] my-3">
              <button className="py-1.5 px-5 border bg-[#3B5390] text-white rounded-md">
                Add Product
              </button>
            </div>
          </form>
        </div>
      </Modal>
      <Toaster />
    </>
  );
};

export default ProductModal;
