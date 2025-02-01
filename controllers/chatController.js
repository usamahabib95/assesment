const { chatStorage, activeUsersStorage } = require("../utils/storage");

exports.getActiveUsers = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const activeUsers = activeUsersStorage.get(chatRoomId);
    if (!activeUsers) {
      return res.status(404).json({ message: "Active users not found" });
    }

    return res.status(200).json({ data: activeUsers });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getChatHistory = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const { limit } = req.query;

    if (limit && (!Number.isInteger(Number(limit)) || limit < 0)) {
      return res.status(400).json({ message: "Invalid limit" });
    }

    const chatHistory = chatStorage.get(chatRoomId);

    if (!chatHistory) {
      return res.status(404).json({ message: "Chat history not found" });
    }

    if (limit) {
      return res.status(200).json({ data: chatHistory.slice(-limit) });
    }

    return res.status(200).json({ data: chatHistory.slice(-50) });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
