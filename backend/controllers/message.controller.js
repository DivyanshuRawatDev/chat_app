// 📁 controllers/message.controller.js
const { MessageModel } = require("../models/Message.model");
const { ConversationModel } = require("../models/Conversation.model");
const { io } = require("../socket");

// 🔹 Send a message
const sendMessage = async (req, res) => {
  const { conversationId, message } = req.body;
  const senderId = req.userId;

  try {
    const newMessage = await MessageModel.create({
      message,
      senderId,
    });

    await ConversationModel.findByIdAndUpdate(conversationId, {
      $push: { messages: newMessage._id },
    });

    // Emit message to all sockets in that conversation room
    io.to(conversationId).emit("receive_message", {
      conversationId,
      message: newMessage.message,
      senderId,
      _id: newMessage._id,
      createdAt: newMessage.createdAt,
    });

    return res.status(201).json({ message: newMessage });
  } catch (error) {
    console.error("sendMessage:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔹 Get all messages for a conversation
const getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await MessageModel.find({
      _id: { $in: (await ConversationModel.findById(conversationId)).messages },
    }).populate("senderId");

    return res.status(200).json({ messages });
  } catch (error) {
    console.error("getMessages:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
