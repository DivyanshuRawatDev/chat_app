const { default: mongoose } = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    conversationType: { type: String, enum: ["group", "single"] },
    conversationMembers: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    ],
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    groupName: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const ConversationModel = mongoose.model("Conversation", conversationSchema);

module.exports = { ConversationModel };
