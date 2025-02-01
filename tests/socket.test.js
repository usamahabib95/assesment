const io = require("socket.io-client");
const axios = require("axios");

describe("Socket.io server", () => {
  let client1, client2;
  const chatRoomId = "1";

  beforeAll((done) => {
    client1 = io.connect("http://localhost:3000", {
      "force new connection": true,
    });
    client2 = io.connect("http://localhost:3000", {
      "force new connection": true,
    });

    let connectedClients = 0;

    const checkConnected = () => {
      connectedClients++;
      if (connectedClients === 2) {
        done();
      }
    };

    client1.on("connect", checkConnected);
    client2.on("connect", checkConnected);
  });

  test("should connect 2 clients, join chat room, send messages", (done) => {
    const message1 = {
      chatRoomId,
      message: "Hello from client1",
      userId: "1",
      timestamp: new Date().toISOString(),
    };
    const message2 = {
      chatRoomId,
      message: "Hello from client2",
      userId: "2",
      timestamp: new Date().toISOString(),
    };

    client1.emit("join", { chatRoomId, userId: "1" });
    client2.emit("join", { chatRoomId, userId: "2" });

    client1.on("message", (message) => {
      expect(message).toEqual(message2);
    });

    client2.on("message", (message) => {
      expect(message).toEqual(message1);
      done();
    });

    client1.emit("message", message1);
    client2.emit("message", message2);
  });

  test("Testing chat history endpoint", async () => {
    // get request to /chat/chat-history/:chatRoomId
    const response = await axios.get(
      `http://localhost:3000/chat/chat-history/${chatRoomId}`
    );
    expect(response.status).toBe(200);
  });

  test("Testing active users endpoint", async () => {
    // get request to /chat/active-users/:chatRoomId
    const response = await axios.get(
      `http://localhost:3000/chat/active-users/${chatRoomId}`
    );
    expect(response.status).toBe(200);
  });

  afterAll((done) => {
    client1.emit("leave", { chatRoomId, userId: "1" });
    client2.emit("leave", { chatRoomId, userId: "2" });
    client1.disconnect();
    client2.disconnect();
    done();
  });
});
