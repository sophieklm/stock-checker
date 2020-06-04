import express from "express";
import http from "http";
import socketIO from "socket.io";
import { controller } from "./controllers/StockController";

export const app: express.Application = express();
export const server = http.createServer(app);
const io = socketIO(server, {
  pingTimeout: 60000,
});

io.on("connection", async (socket) => {
  socket.on("getStock", async () => {
    try {
      const response = await controller.getStockFromAPI();
      socket.emit("gotStock", response.stock);
      controller.saveStockCache(response.stock);
    } catch (e) {
      socket.emit("err", e.message);
    }
  });
});
