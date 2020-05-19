const api = require("../api/api");

module.exports.getStock = async (req, res) => {
  try {
    const response = await api.get("/stock");
    return res.json(response.data);
  } catch (error) {
    console.log("Something went wrong: StockController:getStock", error);
  }
};

module.exports.getStockByID = async (req, res) => {
  try {
    const response = await api.get(`/stock/${req.id}`);
    return res.json(response.data);
  } catch (error) {
    console.log("Something went wrong: StockController:getStockByID", error);
  }
};
