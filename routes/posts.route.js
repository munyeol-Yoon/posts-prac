const express = require("express");

const authMiddleware = require("../middlewares/auth-middleware");
const { Posts } = require("../models");

const router = express.Router();

// 게시글 생성 api
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { userId } = res.locals.user;
    const { title, content } = req.body;

    const post = await Posts.create({
      UserId: userId,
      title,
      content,
    });

    return res.status(201).json({ data: post });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
