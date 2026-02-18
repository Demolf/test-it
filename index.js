require('dotenv').config();

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mysql = require("mysql2"); // ← изменили здесь

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

// Подключение к MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: process.env.DB_HOST === 'localhost' ? false : { rejectUnauthorized: true }
});

// Проверка подключения к БД
db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к MySQL:", err);
    return;
  }
  console.log("Подключено к MySQL (база: chat_db)");
});

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Пользователь подключился");

  socket.on("chat message", (d) => {
    const sql = "INSERT INTO messages (content, name) VALUES (?, ?)";
    db.query(sql, [d.msg, d.name], (err, result) => {
      if (err) {
        console.error("Ошибка при добавлении сообщения:", err);
        return;
      }

      // Отправляем всем (включаем ID и время)
      io.emit("chat message", {
        id: result.insertId,
        msg: d.msg,
        name: d.name,
      });
    });
  });

  const sql =
    "SELECT id, content, name, created_at FROM messages ORDER BY created_at ASC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Ошибка при добавлении сообщения:", err);
      return;
    }

    // Отправляем всем (включаем ID и время)
    socket.emit("get history", results);
  });

  socket.on("disconnect", () => {
    console.log("Пользователь отключился");
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на сайт ${PORT}`);
});

