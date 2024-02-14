const express = require("express");
const cors = require("cors");
const userRouter = require("./routers/userRouter");
const app = express();
app.use(express.json());
app.use("/users", userRouter);

module.exports = app;
