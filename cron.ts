import cron from "node-cron";
import { getProductsByAuction } from "@/actions/product";
import { getAuctionBids } from "@/actions/bids";
// import { io } from "socket.io-client";

// const socket = io("http://localhost:3000");

export const startCron = async (streamId: string) => {
  console.log("hey cron");

  const products = await getProductsByAuction(streamId);
  products.forEach((product) => {
    //update started at
    cron.schedule("*/3 * * * *", async () => {
      // socket.emit("products", product);
      await getAuctionBids(product.id);
      // await getCurrentProduct(product.id)
    });
        //update ended at in setimeout 
        // emit websocket to get product in settimeout

  });
};

