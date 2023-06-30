const express = require("express");

const userRouter = require("./users.route");

const router = express.Router();

router.use("/users", userRouter);

module.exports = router;
