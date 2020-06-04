import express from "express";
import http from "http";
import socketIO from "socket.io";
import { controller } from "./controllers/StockController";

export const app: express.Application = express();
export const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  // tslint:disable-next-line:no-console
  // console.log("Client connected...");
  socket.on("getStock", async () => {
    const response = await controller.getStockFromAPI();
    // tslint:disable-next-line:no-console
    console.log(response);
    socket.emit("gotStock", response.stock);
    controller.saveStockCache(response.stock);
  });
});
