var express = require("express");
const { verifyToken } = require("./middleware");
const user = require("./UserController");
var router = express.Router();

router.get("/me/profile", verifyToken, user.getProfile); // 유저 프로필 가져오기

router.get("/:id/profile", user.getProfileById); // 프로필 가져오기

router.post("/me/profile", verifyToken, user.updateProfile); // 프로필 수정 하기

module.exports = router;
