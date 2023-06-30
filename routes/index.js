const express = require("express");

const userRouter = require("./users.route");
const postRouter = require("./posts.route");

const router = express.Router();

router.use("/users", userRouter);
router.use("/posts", postRouter);

module.exports = router;
