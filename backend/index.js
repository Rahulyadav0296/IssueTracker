const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const issueRouter = require("./routers/issues");

const port = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use(issueRouter);

mongoose
  .connect(MONGO_URL)
  .then((req) => app.listen(port))
  .then((req) => console.log("Congrates, Database Connected!"))
  .catch((err) => console.log(err));
