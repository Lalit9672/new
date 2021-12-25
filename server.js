const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server);

const port = process.env.PORT || 5000;

app.use(express.static(__dirname + "/public"));

app.get("/stream", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/stream.html"));
});

app.get("/view", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/view.html"));
});

app.get("/", function (req, res) {
  res.redirect("index.html"); //para archivos estaticos
});

io.on("connection", function (socket) {
  socket.on("stream", function (data) {
    socket.broadcast.emit("stream", data);
  });
});

// io.of("/stream").clients((error, clients) => {
//   if (error) throw error;
//   console.log(clients);
// });
server.listen(port, () => console.log(`Server is running on port ${port}`));
