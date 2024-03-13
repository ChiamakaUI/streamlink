// "use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// const RoomContainer = dynamic(() => import("../components/RoomContainer"), {
//   ssr: false,
// });

import RoomContainer from "./RoomContainer";

type MainContainerProps = {
  meetingId: string
}

const MainContainer = ({ meetingId }: MainContainerProps) => {
  return (
    // <div>
      <Suspense fallback={<div>Call is not live yet </div>}>
        <RoomContainer meetingId={meetingId}/>
     </Suspense>
    // </div>
  );
};

export default MainContainer;
