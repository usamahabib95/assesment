const express = require("express");
const cors = require("cors");
const chatRouter = require("./routes/chatRouter");
const sockerController = require("./controllers/socketController");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const server = http.createServer(app);

const sockerio = new Server(server);
sockerController(sockerio);

app.use(cors());
app.use(express.json());

app.use("/chat", chatRouter);

const port = 3000;

server.listen(port, () => {
  console.log(`Chat app listening on port ${port}`);
});
