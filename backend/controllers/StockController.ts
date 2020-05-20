import * as express from "express";
import api from "../api/api";

interface Item {
  id: string;
  name: string;
  type: string;
  units_available: number;
}

export default class StockController {
  public router = express.Router();
  private stock: Item[];

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get("/stock", this.getStock);
    this.router.get("/stock/:id", this.getStockByID);
  }

  private getResponseFromAPI = async () => {
    const response = {
      status: 400,
      data: { stock: [] },
      message: "",
    };
    try {
      const responseFromAPI = await api.get("/stock");
      response.status = 200;
      response.data = responseFromAPI.data;
    } catch (error) {
      // tslint:disable-next-line:no-console
      console.log(
        "Something went wrong: StockController::getResponseFromAPI",
        error
      );
      response.status = 500;
      response.message = error.message;
    }
    return response;
  };

  public getStock = async (_req: null, res: express.Response) => {
    const response = await this.getResponseFromAPI();
    return res.status(response.status).send(response);
  };

  public getStockByID = async (req: express.Request, res: express.Response) => {
    const response = await this.getResponseFromAPI();
    if (response.status === 200) {
      const medicine = response.data.stock.find((x) => x.id === req.params.id);
      return res.status(response.status).send(medicine);
    } else {
      return res.status(response.status).send(response);
    }
  };
}
