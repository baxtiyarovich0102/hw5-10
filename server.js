const env = require("dotenv").config();
const express = require("express");
let app = express();

const connectDb = require("./config/db.js");
connectDb()

app.use(express.json());




app.listen(process.env.PORT, () =>
    console.log("This server is running on " , process.env.PORT)
  );