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
    // console.log("a user connected", socket.id);

    socket.on("bids", async (args) => {
      const bid = await db.bid.create({
        data: {
          userId: args.userId,
          productId: args.productId,
          price: args.price,
        }
      });

      io.emit("bids", bid); 
    });

  });

  return io;
};
