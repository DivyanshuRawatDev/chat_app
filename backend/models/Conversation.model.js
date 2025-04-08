const { default: mongoose } = require("mongoose");

const conversationSchema = mongoose.Schema({
  conversationType: { type: String, enum: ["group", "single"] },
  conversationMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
});

const ConversationModel = mongoose.model("conversation", conversationSchema);

module.exports = { ConversationModel };
