const express = require("express");
const jwt = require("jsonwebtoken");

const { Users, UserInfos } = require("../models");

const router = express.Router();

// 화원가입
router.post("/", async (req, res) => {
  try {
    const { email, password, name, age, gender, profileImage } = req.body;

    const isExistUser = await Users.findOne({
      where: { email },
    });

    if (isExistUser) {
      return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    }

    const user = await Users.create({ email, password });

    await UserInfos.create({
      UserId: user.userId,
      name,
      age,
      gender,
      profileImage,
    });

    return res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (err) {
    console.error(err);
  }
});

// 로그인
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({
      where: { email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "해당 사용자가 존재하지 않습니다." });
    } else if (user.password !== password) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }
    const token = jwt.sign(
      {
        userId: user.userId,
      },
      process.env.JWT_SECRET
    );

    res.cookie("authorization", `Bearer ${token}`);

    return res.status(200).json({ message: "로그인에 성공하였습니다." });
  } catch (err) {
    console.error(err);
  }
});

// 사용자 상세 조회
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.body; // 왜 필요하지?

    const user = await Users.findOne({
      attributes: ["userId", "email", "createdAt", "updatedAt"],
      include: [
        {
          model: UserInfos,
          attributes: ["name", "age", "gender", "profileImage"],
        },
      ],
    });

    return res.status(200).json({ data: user });
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
