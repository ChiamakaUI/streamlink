"use server";

import { startCron } from "@/cron";

export const startAuction = async (streamId: string) => {
 console.log("hey auction")
 
    startCron(streamId)
}