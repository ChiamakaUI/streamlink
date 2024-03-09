import { useDynamicContext } from "@dynamic-labs/sdk-react-core";

export const Testin = () => {
  const { user } = useDynamicContext();
  console.log(user);
  return <h1>hey there</h1>;
};

// {
//     turnOnCameraWhenJoining: true,
//     showMyCameraToggleButton: true,
//     showAudioVideoSettingsButton: true,
//     showScreenSharingButton: true,
//     showTextChat: true,
//     showUserList: true,
//     scenario: {
//         mode: "LiveStreaming",
//         config: {
//             role: "Host",
//       },
//   },
// }