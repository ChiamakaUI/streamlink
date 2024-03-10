"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Login } from "../components";

const schema = yup.object({
  streamName: yup.string().required("Please, name your stream"),
});

type FormData = {
  streamName: string;
};

const Main = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    sessionStorage.setItem("callId", data.streamName);
    router.push(`/room/${data.streamName}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <label className="text-lg">Name your live stream:</label> <br />
          <input
            type="text"
            className="border w-[55%] p-2 focus:outline-none my-1.5 rounded-md"
            {...register("streamName")}
          />
          <p className="text-red-500">{errors.streamName?.message}</p>
        </div>
        <button className="py-1.5 px-5 border bg-[#3B5390] text-white rounded-md">
          Continue
        </button>
      </form>
      <Login/>
    </div>
  );
};

export default Main;
