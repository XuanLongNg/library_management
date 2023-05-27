const express = require("express");
const appRoutes = require("./routes");

const app = express();
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer();
const dotenv = require("dotenv");
dotenv.config();
app.use(upload.array());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// console.log(process.env.DB_HOST);

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api", appRoutes);
app.listen(4000, () => {
  console.log("listening on http://localhost:4000");
});
