"use server";

import { db } from "@/lib/db";
import { createToken } from "./livestream";

type UserProps = {
  name: string;
  email?: string;
  wallet: string;
  image?: string;
};

export const register = async (values) => {
  const { name, email, wallet, image } = values;
  const user = await db.user.findUnique({ where: { email } });
  const token = await createToken();

  if (user) {
    return { ...user, token };
  }

  const res = await db.user.create({
    data: {
      name,
      email,
      image,
      walletAddress: wallet,
    },
  });

  return { ...res, token };
};
