interface Items {
  stock: Item[];
}

type Item = {
  id: number;
  name: string;
  type: string;
  units_available: number;
};

export default class StockCache implements Items {
  private _stock: Item[] = [];

  constructor() {
    this._stock = [];
  }

  public get stock(): Item[] {
    return this._stock;
  }

  public updateStock(stock: Item[]) {
    this._stock = stock;
  }

  getStockById(id) {
    return this._stock.filter((s) => s.id === id);
  }
}
