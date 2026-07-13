const http = require("http");

require("./db/db");

const app = require("./app");
const env = require("./config/env");

const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

global.io = io;

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});