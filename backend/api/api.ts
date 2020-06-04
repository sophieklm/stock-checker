import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const token = process.env.API_KEY;

const api = axios.create({
  baseURL: "https://mock-stock-sophieklm.herokuapp.com",
  headers: {
    Authorization: "Bearer " + token,
  },
});

export default api;
