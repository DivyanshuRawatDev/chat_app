const express = require("express");
const router = express.Router();
const {
  getAllConversations,
  findSingleConversation,
  createConversation,
} = require("../controllers/conversation.controller");

router.get("/", getAllConversations);
router.get("/find/:receiverId", findSingleConversation);
router.post("/", createConversation);

module.exports = router;
