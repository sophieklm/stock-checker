const api = require("../api/api");

const getResponseFromAPI = async () => {
  let response = {
    status: 400,
    data: {},
  };
  try {
    const responseFromAPI = await api.get("/stock");
    response.status = 200;
    response.data = responseFromAPI.data;
  } catch (error) {
    console.log(
      "Something went wrong: StockController:getResponseFromAPI",
      error
    );
    response.status = 500;
    response.message = error.message;
  }
  return response;
};

const getStock = async (req, res) => {
  const response = await getResponseFromAPI();
  return res.status(response.status).send(response);
};

const getStockByID = async (req, res) => {
  const response = await getResponseFromAPI();
  if (response.status === 200) {
    const medicine = response.data.stock.find((x) => x.id === req.params.id);
    return res.status(response.status).send(medicine);
  } else {
    return res.status(response.status).send(response);
  }
};

module.exports = { getStock, getStockByID };
