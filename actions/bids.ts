"use server";

import { db } from "@/lib/db";

export const getBids = async (id: string) => {
  const res = await db.bid.findMany({
    where: {
      productId: id,
    },
    include: {
      user: true,
    }
  });
  console.log(res);

  return res;
};

export const getAuctionBids = async (id: string) => {
  const bids = await getBids(id)

  bids.sort((a, b) => b.price - a.price); 
  console.log(bids)
    // return bids[0];
};
