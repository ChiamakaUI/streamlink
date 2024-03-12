"use server";

import { db } from "@/lib/db";

export const getBids = async (id: string) => {
  const res = await db.bid.findMany({
    where: {
      productId: id,
    },
  });
  console.log(res);

  return res;
};
