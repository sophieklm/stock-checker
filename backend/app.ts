import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import { controller } from './controllers/StockController';

export const app: express.Application = express();
export const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
  socket.on('getStock', async () => {
    const response = await controller.getStockFromAPI();
    socket.emit('gotStock', response.stock);
    controller.saveStockCache(response.stock);
  });
});
