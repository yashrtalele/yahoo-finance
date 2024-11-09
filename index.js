const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { initialData } = require("./cron/initialData");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require("./router/forexData");
const { scrapeData } = require("./utils/scrape");
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Connected to the Port!");
});
app.use(initialData);
app.use("/api", routes);
app.listen(PORT, initialData(), () => {
  console.log(`Server started on port ${PORT}`);
});
