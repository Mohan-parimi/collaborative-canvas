const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const RoomManager = require("./rooms");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const rooms = new RoomManager();

app.use(express.static("../client"));

io.on("connection", (socket) => {
  console.log("↗ User connected:", socket.id);

  let currentRoom = "default";
  if (!rooms.hasRoom(currentRoom)) rooms.createRoom(currentRoom);

  const room = rooms.getRoom(currentRoom);
  socket.join(currentRoom);

  room.addUser(socket.id, { username: `User-${socket.id.slice(0, 4)}` });
  io.to(currentRoom).emit("userList", room.getUsers());
  socket.emit("init", room.getActions());

  socket.on("drawing", (data) => {
    room.addAction(data);
    socket.to(currentRoom).emit("drawing", data);
  });

  socket.on("undo", () => {
    room.undo();
    io.to(currentRoom).emit("undo", room.getActions());
  });

  socket.on("redo", () => {
    room.redo();
    io.to(currentRoom).emit("redo", room.getActions());
  });

  socket.on("clearCanvas", () => {
    room.clear();
    io.to(currentRoom).emit("clearCanvas");
  });

  socket.on("text", (data) => {
    room.addAction(data);
    socket.to(currentRoom).emit("text", data);
  });

  socket.on("shape", (data) => {
    room.addAction(data);
    socket.to(currentRoom).emit("shape", data);
  });

  socket.on("disconnect", () => {
    console.log("↘ User disconnected:", socket.id);
    room.removeUser(socket.id);
    io.to(currentRoom).emit("userList", room.getUsers());
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(` Server running at http://localhost:${PORT}`));
