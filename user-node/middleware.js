const jwt = require("jsonwebtoken");
const { secretKey } = require("./config/key");

const verifyToken = (req, res, next) => {
  try {
    // 헤더에서 Bearer 떼고 token을 가져온다.
    const user_token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(user_token, secretKey);
    if (decode) {
      const user_id = decode.id;
      console.log(`jwt autorization success, user_id : ${user_id}`);
      res.user_id = user_id;
      next();
    }
  } catch (e) {
    // console.log(e);
    res.status(400).json({
      success: false,
      msg: "token error",
    });
  }
};

exports.verifyToken = verifyToken;
