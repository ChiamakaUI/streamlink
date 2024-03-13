"use client";

import { useSearchParams } from "next/navigation";
import { MeetingProvider, MeetingConsumer } from "@videosdk.live/react-sdk";
import { Container } from "@/app/components";

type ModeProps = "CONFERENCE" | "VIEWER" | undefined;

const Main = ({ params }: { params: { id: string } }) => {
  const searchParams = useSearchParams();
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const mode = searchParams.get("mode") as ModeProps;

  return (
    currentUser &&
    mode && (
      <MeetingProvider
        config={{
          meetingId: `${params.id}`,
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
            return <Container mode={mode} meetingId={`${params.id}`}/>;
          }}
        </MeetingConsumer>
      </MeetingProvider>
    )
  );
};

export default Main;