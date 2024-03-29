"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk";
import Container from "./Container";

type ModeProps = "CONFERENCE" | "VIEWER" | undefined;

type RoomContainerProps = {
  meetingId: string;
};

const RoomContainer = ({ meetingId }: RoomContainerProps) => {
  const searchParams = useSearchParams();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const mode = searchParams.get("mode") as ModeProps;

  console.log({ meetingId });
  return (
    currentUser &&
    mode && (
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: currentUser.name,
          mode: mode,
        }}
        joinWithoutUserInteraction
        token={currentUser.token}
      >
        <MeetingConsumer>
          {() => {
            return <Container mode={mode} meetingId={meetingId}/>;
          }}
        </MeetingConsumer>
      </MeetingProvider>
    )
  );

};

export default RoomContainer;
