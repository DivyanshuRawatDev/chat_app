function registerSocketEvents(socket, io) {
  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
  });

  socket.on("typing", ({ roomId, senderId }) => {
    socket.to(roomId).emit("typing", { senderId });
  });

  socket.on("stop_typing", (roomId, senderId) => {
    socket.to(roomId).emit("stop_typing", { senderId });
  });

  socket.on("send_message", (data) => {
    try {
      if (typeof data === "string") {
        data = JSON.parse(data);
      }
      const { roomId, message } = data;

      io.to(roomId).emit("receive_message", message);
      console.log(`Message from room ${roomId}: ${message}`);
    } catch (err) {
      console.error(" Invalid data received:", err);
    }
  });
}

module.exports = { registerSocketEvents };
