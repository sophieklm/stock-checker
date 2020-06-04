import dotenv from 'dotenv';
import { app, server } from './app';
import express from 'express';
import cors from 'cors';
import { controller } from './controllers/StockController';

dotenv.config();
const router = express.Router();
const port = process.env.PORT;

app.use(cors({}));

app.use('/', router);

router.get('/stock', controller.getStockCache);
router.get('/stock/:id', controller.getStockByID);

if (process.env.NODE_ENV !== 'test') {
  server.listen(port, () =>
    // tslint:disable-next-line:no-console
    console.log(`Listening at http://localhost:${port}`)
  );
}

module.exports = server;
