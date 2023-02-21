const { render } = require("ejs");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

app.use(express.static(__dirname + "/public"));

io.on("connection", function (socket) {
  console.log("A user connected");

  socket.on("chat message", function (data) {
    console.log("message: " + data.msg);
    console.log("User: " + data.user);
    io.emit("chat message", data);
  });

  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

server.listen(3000, function () {
  console.log("Server listening on port 3000");
});
