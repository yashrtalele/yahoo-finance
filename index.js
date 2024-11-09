const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { initialData } = require("./cron/initialData");
const { history } = require("./utils/history");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./router/forexData");
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Connected to the Port!");
});
app.use("/api", routes);
initialData();
app.listen(
  PORT,
  history(
    `https://finance.yahoo.com/quote/AEDINR=X/history/?period1=2024-11-02&period2=2024-11-09`,
  ),
  () => {
    console.log(`Server started on port ${PORT}`);
  },
);
