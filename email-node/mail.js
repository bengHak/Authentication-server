var express = require("express");
var router = express.Router();
var mail = require("./mailController");

router.post("/send/random-number", mail.sendRandomNumberAPI);

module.exports = router;
