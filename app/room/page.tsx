"use client"

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  Constants,
} from "@videosdk.live/react-sdk";
import { Speaker, Viewer } from "../components";


const Main = () => {
  const [mode, setMode] = useState<string | undefined>();

  console.log({mode})
  return mode ? (
    <MeetingProvider
      config={{
        meetingId: "hpjs-y506-nyh4",
        micEnabled: true,
        webcamEnabled: true,
        name: "chiamaka's Org",
        mode: "CONFERENCE",
      }}
      joinWithoutUserInteraction
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI4NTNiYjc3Yi0zZjE0LTRlODItYWU2OS0zNTcwN2JhYmU1NTIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcwOTk4NjExMCwiZXhwIjoxNzEwMDcyNTEwfQ.dJdQWGnu6lbVcpfLTVcSboIi_P0ICry2leqEZK_gwM8"
    >
      {mode === Constants.modes.CONFERENCE ? <Speaker /> : <Viewer />}
    </MeetingProvider>
  ) : (
    <div>
      <button
        onClick={() => {
          setMode(Constants.modes.CONFERENCE);
        }}
      >
        Join as Speaker
      </button>
      <button
        style={{ marginLeft: 12 }}
        onClick={() => {
          setMode(Constants.modes.VIEWER);
        }}
      >
        Join as Viewer
      </button>
    </div>
  );
};

export default Main;