import cron from "node-cron";
import { db } from "@/lib/db";
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

// const cron = require('node-cron');

// Define your array of tasks
// const tasks = ['task1', 'task2', 'task3'];

// Counter to keep track of completed tasks
// let completedTasks = 0;

// // Function to execute a task
// function executeTask(task) {
//     console.log(`Executing task: ${task}`);
//     // Put your task execution logic here
//     // For demonstration, let's just log the task name
//     // You can replace this with your actual task logic
// }

// Function to start cron job for each task
// function startCronJobs() {
//     tasks.forEach((task, index) => {
//         cron.schedule('* * * * *', () => {
//             executeTask(task);
//             completedTasks++;
//             // Check if all tasks are completed
//             if (completedTasks === tasks.length) {
//                 console.log('All tasks completed.');
//                 // Stop cron jobs
//                 cron.stop();
//             }
//         }, {
//             scheduled: true
//         });
//     });
// }

// Start cron jobs
// startCronJobs();

// for (let index = 0; index < products.length; index++) {
//   const element = products[index];

// if (index !== products.length) {
//   cron.schedule("*/3 * * * *", () => {
//     const bids = db.bid.findMany({
//       where: {
//         productId: element.id,
//       }
//     })

//   });
// }
// products.forEach((product) => {
//   cron.schedule("*/3 * * * *", () => {
//    await getAuctionBids(product.id)

//   });
// })
