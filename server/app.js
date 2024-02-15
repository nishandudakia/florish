const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/logger");
const userRouter = require("./routers/userRouter");
const app = express();
app.use(logger);
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);

const eventRouter = require('./routers/events')
app.use('/events', eventRouter)


app.get("/", (req, res) => {
    res.status(200).json({
      title: "Upcoming Events",
      description: "Get involved with the community and find the right event for you."
    })
  })

module.exports = app

