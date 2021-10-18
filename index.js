const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var online = 0;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  io.emit("online", ++online);
  socket.on("disconnect", () => {
    console.log("user disconnected");
    io.emit("online", --online);
    socket.broadcast.emit("out", "a user disconnected");
  });
});

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

io.on("connection", (socket) => {
  socket.broadcast.emit("in", "a user connected");
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
