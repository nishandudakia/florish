const express = require("express");
const cors = require("cors");

//Middlewares
const app = express();

app.use(cors());
module.exports = app;
