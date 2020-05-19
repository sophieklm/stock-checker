const axios = require("axios");
const token = process.env.API_KEY;

module.exports = axios.create({
  baseURL: "https://tech-challenge-mock-supplier.herokuapp.com",
  headers: {
    Authorization: "Bearer " + token,
  },
});
