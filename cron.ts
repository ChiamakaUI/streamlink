import cron from "node-cron";
import { getProductsByStream } from "@/actions/product";
import { getAuctionBids } from "@/actions/bids";

export const startCron = async (streamId: string) => {
  console.log("hey cron");

  const products = await getProductsByStream(streamId);
  products.forEach((product) => {
    cron.schedule("*/3 * * * *", async () => {
      await getAuctionBids(product.id);
    });
  });
};

