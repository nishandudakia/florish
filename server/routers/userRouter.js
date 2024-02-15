const express = require("express");
const userRouter = express.Router();

const userController = require("../controllers/userController");

userRouter.get("/", userController.index);
userRouter.get("/:token", userController.show)
userRouter.post("/login", userController.login);
userRouter.post("/signup", userController.signUp);

module.exports = userRouter;
