"use client"

import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt"

const Main = ({ params }: { params: { id: string } }) => {
    // const roomID = params.id
    // const startMeeting = async() => {
    //     const appID = 439824961
    //     const serverSecret = ""
    //     const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    //         appID,
    //         serverSecret,
    //         roomID,
    //     )

    //     const zp = ZegoUIKitPrebuilt.create(kitToken);

    //     zp.joinRoom({
            
    //     })
    // }
    return (
    <div>
        {params.id}
    </div>
  )
}

export default Main