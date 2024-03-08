"use client";
import { DynamicEmbeddedWidget } from "@dynamic-labs/sdk-react-core";

const Main = () => {
  return (
    <div className="w-[85%] lg:w-[30%] mx-auto my-14">
      <DynamicEmbeddedWidget background="with-border" />
    </div>
  );
};

export default Main;
