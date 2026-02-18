const mysql = require("mysql2");

// Подключение к MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "chat_db",
});

// Проверка подключения к БД
db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к MySQL:", err);
    return;
  }
  console.log("Подключено к MySQL (база: chat_db)");
});


module.exports = db
