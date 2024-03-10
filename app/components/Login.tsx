"use client";
import { DynamicEmbeddedWidget } from "@dynamic-labs/sdk-react-core";
import Modal from "./Modal";

const Login = () => {
  return (
    <Modal bgColor={"bg-white"}>
      <div className="w-[85%] lg:w-[30%] mx-auto my-14">
        <DynamicEmbeddedWidget background="with-border" />
      </div>
    </Modal>
  );
};

export default Login;
