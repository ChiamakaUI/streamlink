"use client";

import { useState, useEffect, useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import toast, { Toaster } from "react-hot-toast";
import { createMeeting, addMeeting } from "@/actions/livestream";
import { Login } from "../components";
import { UserContext } from "@/context/UserContext";

const Main = () => {
  const { user } = useDynamicContext();
  const { user: currentUser } = useContext(UserContext)
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const startStream = useCallback(async () => {
    console.log("heyyy");
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    // const currentUser = JSON.parse(localStorage.getItem("user") || "{}");
    console.log({currentUser});
    const meetingId = await createMeeting(currentUser.token);
    console.log("middle");
    await addMeeting({ name: meetingId, userId: currentUser.id });

    router.push(`${meetingId}?mode=CONFERENCE`);
    console.log("byyye");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const handleCloseModal = useCallback(async () => {
    try {
      await startStream();
      setShowLoginModal(false);
    } catch (error) {
      console.error("Error in async operation:", error);
    }
  }, [startStream]);

  useEffect(() => {
    if (currentUser) {
      // toast.success("You are signed in, click button below to continue");
      // startStream();
      // setShowLoginModal(false);
      handleCloseModal();
      return;
    }
  }, [currentUser, handleCloseModal]);

  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-xl lg:text-3xl my-5">Welcome To StreamLink </p>
        <div className="flex flex-col items-center">
          <p className="text-base text-center lg:text-xl mb-5">
            Click Button below to start an instant livestream
          </p>
          <button
            className="drop-shadow-md border px-3 py-1.5 text-sm lg:text-xl rounded-lg"
            onClick={startStream}
          >
            Stream now
          </button>
        </div>
      </div>
      {showLoginModal && <Login />}
      <Toaster />
    </>
  );
};

export default Main;
