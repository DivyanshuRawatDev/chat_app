const { ConversationModel } = require("../models/Conversation.model");

const getAllConversations = async (req, res) => {
  try {
    const conversations = await ConversationModel.find({
      conversationMembers: { $in: [req.userId] },
    })
      .populate("conversationMembers")
      .populate({
        path: "messages",
        options: { sort: { createdAt: -1 }, limit: 1 },
      });

    return res.status(200).json({ data: conversations });
  } catch (error) {
    console.error("getAllConversations:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔹 Find single conversation between two users
const findSingleConversation = async (req, res) => {
  const { receiverId } = req.params;
  const senderId = req.userId;

  try {
    const conversation = await ConversationModel.findOne({
      conversationType: "single",
      conversationMembers: { $all: [receiverId, senderId], $size: 2 },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({ exists: false });
    }

    return res.status(200).json({ exists: true, data: conversation });
  } catch (error) {
    console.error("findSingleConversation:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// 🔹 Create single or group conversation
const createConversation = async (req, res) => {
  const { conversationType, conversationMembers, groupName } = req.body;
  const creatorId = req.userId;

  try {
    const conversation = await ConversationModel.create({
      conversationType,
      conversationMembers: [...conversationMembers, creatorId],
      groupName: conversationType === "group" ? groupName : undefined,
      admin: conversationType === "group" ? creatorId : null,
    });

    return res.status(201).json({ conversation });
  } catch (error) {
    console.error("createConversation:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllConversations,
  findSingleConversation,
  createConversation,
};
