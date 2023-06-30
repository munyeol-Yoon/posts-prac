const express = require("express");

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

module.exports = router;
