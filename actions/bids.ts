"use server";

import { db } from "@/lib/db";
import axios from "axios";

export const getBids = async (id: string) => {
  const res = await db.bid.findMany({
    where: {
      productId: id,
    },
    include: {
      user: true,
      product: true,
    },
  });
  // console.log(res);

  return res;
};

export const getAuctionBids = async (id: string) => {
  console.log("hey bids");
  const bids = await getBids(id);

  bids.sort((a, b) => b.price - a.price);
  console.log("hhehyy bids");
  console.log(bids);
  console.log("hhehyy bids1");
  // return bids[0];
  const config = {
    headers: {
      Authorization: `Bearer 9be9ed262a2ff1.c363e387ad94444797893cd883974587`,
    },
  };

  const nftData = {
    name: bids[0].product.name,
    image: bids[0].product.image,
    receiver: {
      address: bids[0].user.walletAddress,
    },
  };

  const mintNft = await axios.post(
    `https://devnet.underdogprotocol.com/v2/projects/1/nfts`,
    nftData,
    config
  );

  console.log(mintNft);
};
