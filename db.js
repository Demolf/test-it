const mysql = require("mysql2");

// Подключение к MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  // database: "chat_db", // Убрано, чтобы подключиться к MySQL без выбора базы
});

// Проверка подключения к БД
db.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к MySQL:", err);
    return;
  }
  console.log("Подключено к MySQL");
});

// Сначала создаём базу данных, если её нет
const createDbQuery = "CREATE DATABASE IF NOT EXISTS chat_db";
db.query(createDbQuery, (err, result) => {
  if (err) {
    console.error("Ошибка при создании базы данных chat_db:", err);
    return;
  }
  console.log("База данных chat_db готова к использованию");

  // Теперь подключаемся к базе данных chat_db
  db.changeUser({ database: "chat_db" }, (err) => {
    if (err) {
      console.error("Ошибка при подключении к базе данных chat_db:", err);
      return;
    }

    // Создаём таблицу, если её нет
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;

    db.query(createTableQuery, (err, result) => {
      if (err) {
        console.error("Ошибка при создании таблицы messages:", err);
      } else {
        console.log("Таблица messages готова к использованию");
      }
    });
  });
});

module.exports = db;
