"use client"

import { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
  Constants,
} from "@videosdk.live/react-sdk";

import { Speaker, Viewer } from "../components";

// const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI4NTNiYjc3Yi0zZjE0LTRlODItYWU2OS0zNTcwN2JhYmU1NTIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMDAyMjkwOSwiZXhwIjoxNzEwNjI3NzA5fQ.-XrO0TTWfw6WApoN7VhDSkk4OoOy_MU2Wi1LTONEOpA";

const Main = () => {
  const [mode, setMode] = useState<string | undefined>();

  console.log({mode})
  return mode ? (
    <>
    <p>hhhhh</p>
        <MeetingProvider
      config={{
        meetingId: "hpjs-y506-nyh4",
        micEnabled: true,
        webcamEnabled: true,
        name: "chiamaka's Org",
        mode: "CONFERENCE",
      }}
      joinWithoutUserInteraction
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI4NTNiYjc3Yi0zZjE0LTRlODItYWU2OS0zNTcwN2JhYmU1NTIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMDAyMjkwOSwiZXhwIjoxNzEwNjI3NzA5fQ.-XrO0TTWfw6WApoN7VhDSkk4OoOy_MU2Wi1LTONEOpA"
    >
      {mode === Constants.modes.CONFERENCE ? <Speaker /> : <Viewer />}
    </MeetingProvider>
    </>

  ) : (
    <div>
            <p>ggggggg</p>

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