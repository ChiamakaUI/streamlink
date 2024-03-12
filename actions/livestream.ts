"use server";

import jwt from "jsonwebtoken";
import { db } from "@/lib/db";

const API_KEY = "853bb77b-3f14-4e82-ae69-35707babe552";
const SECRET =
  "1888c0a1786d42c82772475fb94187a883ab3b34b9c6e6f15e43f0bc9a4ca80e";

type Meeting = {
  name: string;
  userId: string;
};

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

// API call to add meeting to db

export const addMeeting = async (values: Meeting) => {
  const res = await db.liveStream.create({
    data: values,
  });

  console.log(res);
  return res;
};
