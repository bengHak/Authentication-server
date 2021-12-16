const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const saltRounds = 10;
const { secretKey } = require("./config/key.js");

exports.bcryptPW = async (pw) => {
  let result = "";
  try {
    result = bcrypt.hashSync(pw, saltRounds);
  } catch (e) {
    result = false;
  }
  return result;
};

exports.comparePW = async (pw, dbpw) => {
  let result = "";
  try {
    result = bcrypt.compareSync(pw, dbpw);
  } catch (e) {
    result = false;
    console.log(e);
  }
  return result;
};

exports.issueToken = async (user_id, authority) => {
  let result = "";
  try {
    result = jwt.sign(
      { id: user_id, authority },
      secretKey,
      { expiresIn: "30d" },
      { algorithm: "HS256" }
    );
  } catch (e) {
    result = false;
  }
  return result;
};

exports.getNow = async () => {
  let result = "";
  try {
    result = moment().format("YYYY-MM-DD HH:mm:ss");
  } catch (e) {
    result = false;
  }
  return result;
};
