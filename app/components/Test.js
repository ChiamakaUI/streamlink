import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export const Testin = () => {
  const { user } = useDynamicContext();
  console.log(user);
  return <h1>hey there</h1>;
};
