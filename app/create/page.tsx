"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Login } from "../components";
import { register } from "@/actions/auth";
import { createMeeting } from "@/actions/livestream";

const Main = () => {
  const { user } = useDynamicContext();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const startStream = async () => {
    if (!user) {
      setIsLoggedIn(true);
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
    console.log(signedInUser);
    const meetingId = await createMeeting(signedInUser.token)
    console.log(meetingId)
    router.push(`room/${meetingId}?mode=CONFERENCE`)
  };

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
      {isLoggedIn && <Login />}
    </>
  );
};

export default Main;
