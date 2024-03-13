"use client";
import dynamic from "next/dynamic";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Login } from "../components";

const RoomContainer = dynamic(() => import("../components/RoomContainer"), {
  ssr: false,
});

const Main = () => {
  // const { user } = useDynamicContext();

  // console.log(user)

  // if (!user) {
  //   return <Login />;
  // }
  return (
    <div>
      {/* <RoomContainer /> */}
      <Login />
    </div>
  );
};

export default Main;
