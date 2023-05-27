const express = require("express");
const appRoutes = require("./routes");

const app = express();
var bodyParser = require("body-parser");
var multer = require("multer");
var upload = multer();
app.use(upload.array());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api", appRoutes);
app.listen(3000, () => {
  console.log("listening on http://localhost:3000");
});
