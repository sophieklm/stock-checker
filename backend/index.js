require("dotenv").config();
const path = require("path");

const express = require("express");
const app = express();
const port = process.env.PORT;

app.use("/", require("./routes/routes"));

app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
