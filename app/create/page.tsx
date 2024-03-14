"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import toast, { Toaster } from "react-hot-toast";
import { register } from "@/actions/auth";
import { createMeeting, addMeeting } from "@/actions/livestream";
import { Login } from "../components";

const Main = () => {
  const { user } = useDynamicContext();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const startStream = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    const { email, firstName, lastName, verifiedCredentials } = user;

    const newUser = {
      name: `${firstName} ${lastName}`,
      email: email,
      wallet: verifiedCredentials[0].address,
    };

    if (newUser.email === undefined || newUser.wallet === undefined) return;

    const signedInUser = await register(newUser);

    const meetingId = await createMeeting(signedInUser.token);
    localStorage.setItem("user", JSON.stringify(signedInUser));
    
    await addMeeting({ name: meetingId, userId: signedInUser.id });

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
