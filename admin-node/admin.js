var express = require("express");
var router = express.Router();
var { verifyToken } = require("./middleware");
var auth = require("./adminController");

// 유저 목록 전체 조회
router.get("/user-list", verifyToken, auth.getUserList);

// 유저 데이터 수정
router.put("/:id", verifyToken, auth.updateUser);

// 유저 삭제
router.delete("/:id", verifyToken, auth.deleteUser);

// 관리자 지정
router.put("/:id/admin", verifyToken, auth.updateUserAuthority);

module.exports = router;
