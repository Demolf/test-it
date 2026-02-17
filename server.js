// server.js
const express = require('express');
const http = require('http');
// const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// Раздаём статику
app.use(express.static('public'));

// Храним всех клиентов
const clients = new Set();

// wss.on('connection', (ws) => {
//     console.log('Новый пользователь подключился');
//     clients.add(ws);

//     ws.on('message', (data) => {
//         console.log('Сообщение:', data.toString());
//         // Рассылаем всем, кроме отправителя
//         clients.forEach((client) => {
//             if (client !== ws && client.readyState === WebSocket.OPEN) {
//                 client.send(data.toString());
//             }
//         });
//     });

//     ws.on('close', () => {
//         console.log('Пользователь отключился');
//         clients.delete(ws);
//     });
// });

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Чат запущен на http://localhost:${PORT}`);
});