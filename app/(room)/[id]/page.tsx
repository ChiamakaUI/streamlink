"use client";
import { Login, MainContainer } from "@/app/components";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

const Main = ({ params }: { params: { id: string } }) => {
  const { user } = useDynamicContext();
  return <>{!user ? <Login /> : <MainContainer meetingId={params.id}/>}</>;
};

export default Main;
