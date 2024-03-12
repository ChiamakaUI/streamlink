// @ts-nocheck

const { Server } = require("socket.io");
// const startCron = require("../../cron")

module.exports = (server, db) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000/",
      allowRequest: (req, callback) => {
        const noOriginHeader = req.headers.origin === undefined;
        callback(null, noOriginHeader); // only allow requests without 'origin' header
      },
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    socket.on("bids", async (args) => {
      // console.log("bids", args);
    //   startCron()
      const bid = await db.bid.create({
        data: {
          userId: args.userId,
          productId: args.productId,
          price: args.price,
        }
      });

      // check if other bids have been made for this 
      console.log(bid);
      const multipleBids = await db.bid.findMany();
      // console.log({multipleBids})
      io.emit("bids", multipleBids);
    });

    socket.emit("allbids", "world")
  });

  return io;
};
