"use server";

import { getProductsByAuction } from "./product";
import { getAuctionBids } from "./bids";
import { db } from "@/lib/db";

// import { io, sendProductToClients } from "@/websocket/websocket";

export const startAuction = async (streamId: string) => {
  console.log("hey auction");
  // console.log({ io });
  const products = await getProductsByAuction(streamId);
  // console.log({ products })
  for (const product of products) {
    await db.product.update({
      where: {
        id: product.id,
      },
      data: {
        auctionStarted: new Date(),
      },
    });
    await new Promise((resolve) => {
      setTimeout(async () => {
        await getAuctionBids(product.id);
        await db.product.update({
          where: {
            id: product.id,
          },
          data: {
            auctionEnded: new Date(),
          },
        });
        resolve(undefined);
      }, 3000); // Adjust the delay time as needed
    });
  }

  console.log("stopped");
};

// revalidatePath("/(room)/[id]", "layout");
// import { revalidatePath } from "next/cache";
// import { db } from "@/lib/db";
// import { startCron } from "@/cron";
// import { initApp } from "@/server";
// import { createSocketServer } from "@/server";

// console.log(product);
// Do something with item
// io.emit("product", product);
// sendProductToClients(product)
// io.on("connection", (socket) => {
//   console.log(socket.id);
//   socket.emit("product", product);
// });
