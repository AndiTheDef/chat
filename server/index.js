const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://andithedef.github.io/chat/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("socket", socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log("user with id ", socket.id + "joined room " + data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("recieve_message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Running");
});

app.use(express.static(__dirname)); //here is important thing - no static directory, because all static :)

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});
