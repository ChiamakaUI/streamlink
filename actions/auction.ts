"use server";

// import { startCron } from "@/cron";
import { getProductsByAuction } from "./product";
import { getAuctionBids } from "./bids";

export const startAuction = async (streamId: string) => {
  console.log("hey auction");

  const products = await getProductsByAuction(streamId);
  
  for (const product of products) {
    await db.product.update({
      where: {
        id: product.id,
      },
      data: {
        auctionStarted: Date.now(),
      },
    });
    await new Promise((resolve) => {
      setTimeout(async () => {
        console.log(product); // Do something with item
        await getAuctionBids(product.id);
        await db.product.update({
          where: {
            id: product.id,
          },
          data: {
            auctionEnded: Date.now(),
          },
        });
        resolve(undefined);
      }, 3000); // Adjust the delay time as needed
    });
  }
};
