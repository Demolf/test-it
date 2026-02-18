const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const io = require('./server')

const db = require("./db");

const PORT = 3000;

app.use(express.static("public"));

io.connect(server)

server.listen(PORT, () => {
  console.log(`Сервер запущен на сайт ${PORT}`);
});
