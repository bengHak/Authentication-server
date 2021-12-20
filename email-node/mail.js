var express = require("express");
var router = express.Router();
var mail = require("./mailController");

router.post("/send/code", mail.sendRandomNumberAPI);

module.exports = router;
