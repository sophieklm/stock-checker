import * as express from 'express';
import api from '../api/api';
import StockCache from '../models/stock';

export default class StockController {
  private stockCache: StockCache;

  constructor() {
    this.stockCache = new StockCache();
  }

  public getStockCache = async () => {
    return this.stockCache.stock;
  };

  public getStockFromAPI = async () => {
    try {
      const response = await api.get('/stock');
      this.stockCache.updateStock(response.data.stock);
      return response.data;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  public getStockByID = async (req: express.Request, res: express.Response) => {
    try {
      const response = await api.get('/stock');
      const medicine = response.data.stock.find((x) => x.id === req.params.id);
      res.status(200).send(medicine);
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
}

const controller = new StockController();

export { controller };
