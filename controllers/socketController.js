const { chatStorage, activeUsersStorage } = require("../utils/storage");

module.exports = (io) => {
  global.io = io;

  io.on("connection", (socket) => {
    socket.on("join", async (event) => {
      const { userId, chatRoomId } = event;
      socket.join(chatRoomId);
      const activeUsers = activeUsersStorage.get(chatRoomId) || [];
      activeUsers.push(userId);
      activeUsersStorage.set(chatRoomId, activeUsers);
    });

    socket.on("message", async (event) => {
      const { chatRoomId } = event;

      const chatRoom = chatStorage.get(chatRoomId) || [];
      chatRoom.push(event);
      chatStorage.set(chatRoomId, chatRoom);

      // using except to omit the sender from receiving his own message he sent
      io.to(chatRoomId).except(socket.id).emit("message", event);
    });

    socket.on("leave", async (event) => {
      const { chatRoomId, userId } = event;
      socket.leave(chatRoomId);

      const activeUsers = activeUsersStorage.get(chatRoomId);
      const index = activeUsers.indexOf(userId);
      if (index > -1) {
        activeUsers.splice(index, 1);
      }
      activeUsersStorage.set(chatRoomId, activeUsers);
    });
  });
};
