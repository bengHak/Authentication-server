var express = require("express");
var router = express.Router();
var auth = require("./authController");

router.post("/signup", auth.signUpAPI);
router.post("/signin", auth.signInAPI);

module.exports = router;
