import * as express from "express";
import api from "../api/api";

export default class StockController {
  public getStock = async (_req: null, res: express.Response) => {
    try {
      const response = await api.get("/stock");
      return res.status(200).send(response.data);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log("Something went wrong: getResponseFromAPI", e);
      return res.status(500).send(e.message);
    }
  };

  public getStockByID = async (req: express.Request, res: express.Response) => {
    try {
      const response = await api.get("/stock");
      const medicine = response.data.stock.find((x) => x.id === req.params.id);
      res.status(200).send(medicine);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log("Something went wrong: getStockByID", e);
      res.status(500).send(e.message);
    }
  };
}

const controller = new StockController();

export { controller };
