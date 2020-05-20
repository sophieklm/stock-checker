import axios from 'axios'
const API_URL = 'http://localhost:4000/stock/'

export default {
  async getStock() {
    const res = await axios.get(API_URL)
    return res.data
  },
  async getStockByID(stockId) {
    const res = await axios.get(API_URL + stockId)
    return res.data
  }
}
