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

// 게시글 목록 조회
router.get("/", authMiddleware, async (req, res) => {
  try {
    const posts = await Posts.findAll({
      attributes: ["postId", "title", "createdAt", "updatedAt"],
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({ data: posts });
  } catch (err) {
    console.error(err);
  }
});

// 게시글 상세 조회
router.get("/:postId", authMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Posts.findOne({
      attributes: ["postId", "title", "content", "createdAt", "updatedAt"],
      where: { postId },
    });

    return res.status(200).json({ data: post });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
