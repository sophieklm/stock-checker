import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import StockController from "./controllers/StockController";

dotenv.config();

export default class App {
  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(
      cors({
        credentials: true,
        origin: ["http://localhost:4000", "http://localhost:3000"],
      })
    );
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public Start() {
    if (process.env.NODE_ENV !== "test") {
      this.app.listen(this.port, () =>
        // tslint:disable-next-line:no-console
        console.log(`Example app listening at http://localhost:${this.port}`)
      );
    }
  }
}

new App([new StockController()], process.env.PORT).Start();
