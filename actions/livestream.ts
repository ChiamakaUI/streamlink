"use server";

import jwt from "jsonwebtoken";

const authToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI4NTNiYjc3Yi0zZjE0LTRlODItYWU2OS0zNTcwN2JhYmU1NTIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTcxMDAyMjkwOSwiZXhwIjoxNzEwNjI3NzA5fQ.-XrO0TTWfw6WApoN7VhDSkk4OoOy_MU2Wi1LTONEOpA";
const API_KEY = "853bb77b-3f14-4e82-ae69-35707babe552";
const SECRET =
  "1888c0a1786d42c82772475fb94187a883ab3b34b9c6e6f15e43f0bc9a4ca80e";

export const createToken = () => {
  const payload = {
    apikey: API_KEY,
    permissions: [`allow_join`],
  };

  const token = jwt.sign(payload, SECRET, {
    algorithm: "HS256",
    expiresIn: "120m",
  });
  console.log(token);
  return token;
};

// API call to create meeting

export const createMeeting = async (token: string) => {
  console.log(token);
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  return roomId;
};

export const captureHLSThumbnail = async ({ roomId }) => {
  const res = await fetch(`https://api.videosdk.live/v2/hls/capture`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ roomId: roomId }),
  });

  const data = await res.json();
  return data;
};
