# Чат на Node.js с использованием Express и Socket.IO

Это простое веб-приложение чата, построенное на Node.js, Express и Socket.IO. Оно позволяет пользователям подключаться, отправлять сообщения в реальном времени и просматривать историю сообщений.

## Технологии

- **Node.js** — серверная платформа на JavaScript.
- **Express** — веб-фреймворк для Node.js.
- **Socket.IO** — библиотека для двусторонней связи в реальном времени.
- **MySQL** — реляционная база данных для хранения сообщений.

## Установка

1. Убедитесь, что у вас установлены [Node.js](https://nodejs.org/) и [MySQL](https://www.mysql.com/).
2. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/Demolf/test-it.git
   cd test-it
   ```
3. Установите зависимости:
   ```bash
   npm install
   ```
4. Настройте подключение к базе данных в файле `db.js`.
5. Запустите сервер:
   ```bash
   npm start
   ```
   Или в режиме разработки с автоматической перезагрузкой:
   ```bash
   npm run dev
   ```
6. Откройте браузер и перейдите по адресу `http://localhost:3000`.

## Структура проекта

- `index.js` — основной серверный скрипт.
- `db.js` — конфигурация подключения к базе данных.
- `public/` — статические файлы (HTML, CSS, JS для клиента).
- `package.json` — метаданные проекта и зависимости.

## Таблица MySQL

Для работы чата требуется таблица `messages` в базе данных `chat_db`. Создайте её с помощью следующего SQL-запроса:

```sql
CREATE DATABASE IF NOT EXISTS chat_db;
USE chat_db;

CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

После создания таблицы убедитесь, что данные в `db.js` (хост, пользователь, пароль) соответствуют вашей конфигурации MySQL.

