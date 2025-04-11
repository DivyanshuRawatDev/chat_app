const { Server } = require("socket.io");

let io;
function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:8080",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    registerSocketEvents(socket, io);

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });
}

module.exports = { setupSocket, io };

