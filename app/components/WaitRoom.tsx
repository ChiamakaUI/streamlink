import { FaFaceGrinWide } from "react-icons/fa6";

const WaitRoom = () => {
  return (
    <div className="flex flex-col items-center w-[85%] mx-auto my-24 ">
      <FaFaceGrinWide className="text-9xl text-[#EDF042]" />
      <p className="text-lg font-semibold text-center mt-3">
        Please, hold on. Stream is yet to start yet or is stopped
      </p>
    </div>
  );
};

export default WaitRoom;
