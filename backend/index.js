require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;

app.use("/", require("./routes/routes"));

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
  );
}

module.exports = app;
