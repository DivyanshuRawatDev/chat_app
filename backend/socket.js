const { Server } = require("socket.io");
const { registerSocketEvents } = require("./utils/socketUtils");

let io;
function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    registerSocketEvents(socket, io);

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
}

module.exports = { setupSocket, io };
