const socketIo = require("socket.io");

const db = require("./db");

const m = {};

m.connect = (server) => {
  const io = socketIo(server);
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
};

module.exports = m;
