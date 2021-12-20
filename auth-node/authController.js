const { createClient } = require("redis");
const { SELECT_USER_BY_EMAIL, INSERT_USER } = require("./query");
const { bcryptPW, comparePW, issueToken, getNow } = require("./lib");

// 이메일 중복 체크
exports.checkEmailAPI = async (req, res) => {
  const conn = await res.pool.getConnection();
  const { email } = req.body;

  try {
    const [rows] = await conn.query(SELECT_USER_BY_EMAIL, [email]);
    if (rows.length === 0) {
      console.log("email not exist");
      res.status(200).json({
        success: true,
        msg: "email is available",
      });
    } else {
      console.log("email exist");
      res.status(200).json({
        success: false,
        msg: "email is already used",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      msg: "error",
    });
  } finally {
    conn.release();
  }
};

// 인증 번호 비교하기
exports.verifyRandomNumber = async (req, res) => {
  const { email, code } = req.body;

  const client = createClient();

  try {
    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
    const value = await client.get(email);
    console.log(value, code);
    if (value === code) {
      res.status(200).json({
        success: true,
        msg: "verify success",
      });
    } else {
      res.status(400).json({
        success: false,
        msg: "verify failed",
      });
    }
  } catch (e) {
    res.status(500).json({
      success: false,
      msg: "verify error",
    });
  } finally {
    client.quit();
  }
};

// 회원가입
exports.signUpAPI = async (req, res) => {
  const conn = await res.pool.getConnection();
  try {
    const { email, password, username } = req.body;
    let email_check = await conn.query(SELECT_USER_BY_EMAIL, [email]);

    if (email_check[0].length === 0) {
      let b_password = await bcryptPW(password);
      let createdAt = await getNow();
      await conn.beginTransaction();
      let result = await conn.query(INSERT_USER, [
        email,
        b_password,
        username,
        createdAt,
        createdAt,
      ]);
      const user_id = result[0].insertId;
      console.log(user_id);
      let token = await issueToken(user_id, 0);
      if (!b_password || !token) throw e;
      await conn.commit();
      console.log(`${email} signup success`);
      res.status(200).json({
        success: true,
        msg: "signup success",
        data: token,
      });
    } else {
      res.status(400).json({ success: false, msg: "duplicated email" });
    }
  } catch (e) {
    await conn.rollback();
    console.log(`signup e : ${e}`);
    res.status(500).json({ success: false, msg: "signup error" });
  } finally {
    await conn.release();
  }
};

// 로그인
exports.signInAPI = async (req, res) => {
  const conn = await res.pool.getConnection();
  try {
    const email = req.body.email;
    const givenPassword = req.body.password;

    console.log(email, givenPassword);

    let result = await conn.query(SELECT_USER_BY_EMAIL, [email]);
    let { id, password, authority } = result[0][0];

    let email_check = result[0].length > 0;
    if (!email_check) {
      res.status(400).json({ success: false, msg: "signin failed" });
    } else {
      let c_password = await comparePW(givenPassword, password);
      if (!c_password) {
        res.status(400).json({ success: false, msg: "signin failed" });
      } else {
        let token = await issueToken(id, authority);
        if (!token) throw e;
        console.log(`${email} signin success`);
        res.status(200).json({
          success: true,
          msg: "signin success",
          data: { id, authority, token },
        });
      }
    }
  } catch (e) {
    console.log(`signin e : ${e}`);
    res.status(400).json({ success: false, msg: "signin error" });
  } finally {
    await conn.release();
  }
};
