const express = require("express");
const chatRouter = express.Router();
const chatController = require("../controllers/chatController");

chatRouter.get("/active-users/:chatRoomId", chatController.getActiveUsers);
chatRouter.get("/chat-history/:chatRoomId", chatController.getChatHistory);

module.exports = chatRouter;
