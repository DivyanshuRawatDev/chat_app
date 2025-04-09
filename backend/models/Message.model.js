const { default: mongoose } = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    message: { type: String, required: true },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", messageSchema);

module.exports = { MessageModel };
