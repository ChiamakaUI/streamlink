"use server";

import { db } from "@/lib/db";
import { startCron } from "@/cron";

export const startAuction = async (streamId: string) => {
 console.log("hey auction")
    // const auctions = db.b
    // const products = await db.product.findMany({
    //     where: {
    //         liveStreamName: streamId,
    //     }
    //   })
    startCron(streamId)
}