"use server";

import { getProductsByAuction } from "./product";
import { getAuctionBids } from "./bids";


export const startAuction = async (streamId: string) => {
  console.log("hey auction");
  // console.log({ io });
  const products = await getProductsByAuction(streamId);
  // console.log({ products })
  for (const product of products) {
    console.log(product)
    await new Promise((resolve) => {
      setTimeout(async () => {
        await getAuctionBids(product.id);
        resolve;
      }, 3000); // Adjust the delay time as needed
    });
  }

  console.log("stopped");
};
