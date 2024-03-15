"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import toast, { Toaster } from "react-hot-toast";
import { createMeeting, addMeeting } from "@/actions/livestream";
import { Login } from "../components";

const Main = () => {
  const { user } = useDynamicContext();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const startStream = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    const meetingId = await createMeeting(currentUser.token);
      
    await addMeeting({ name: meetingId, userId: currentUser.id });

    router.push(`${meetingId}?mode=CONFERENCE`);
  };

  useEffect(() => {
    if (user) {
      setShowLoginModal(false);
      toast.success("You are signed in, click button below to continue");
      return;
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col items-center">
        <p className="text-3xl my-5">Welcome To StreamLink </p>
        <div className="flex flex-col items-center">
          <p className="text-xl mb-5">
            Click Button below to start an instant livestream
          </p>
          <button
            className="drop-shadow-md border px-3 py-1.5 text-xl"
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
