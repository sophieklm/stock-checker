import * as express from "express";
import api from "../api/api";
import client from "../redis";

export default class StockController {
  public getStockCache = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const response = await client.getAsync("stockCache").then((result) => {
        return result;
      });
      res.status(200).send(response);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };

  public saveStockCache = (stock) => {
    client.set("stockCache", JSON.stringify(stock));
  };

  public getStockFromAPI = async () => {
    try {
      const response = await api.get("/stock");
      return response.data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  public getStockByID = async (req: express.Request, res: express.Response) => {
    try {
      const response = await api.get("/stock");
      const medicine = response.data.stock.find((x) => x.id === req.params.id);
      res.status(200).send(medicine);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
}

const controller = new StockController();

export { controller };
