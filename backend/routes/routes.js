const express = require("express");
const router = express.Router();

const StockController = require("../controllers/StockController");

router.get("/stock", StockController.getStock);
router.get("/stock/:id", StockController.getStockByID);

module.exports = router;
