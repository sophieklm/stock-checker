import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { controller } from "./controllers/StockController";

dotenv.config();

const app: express.Application = express();
const router = express.Router();
const port = process.env.PORT;
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4000", "http://localhost:3000"],
  })
);

app.use("/", router);

router.get("/stock", controller.getStock);
router.get("/stock/:id", controller.getStockByID);

app.listen(port, () =>
  // tslint:disable-next-line:no-console
  console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = app;
