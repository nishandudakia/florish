const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const userRouter = require("./routers/userRouter");
const app = express();
app.use(logger);
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

module.exports = app;
