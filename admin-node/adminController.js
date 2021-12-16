const query = require("./query");

// 유저 목록 전체 조회
exports.getUserList = async (req, res) => {
  const conn = await res.pool.getConnection();
  try {
    const result = await conn.query(query.SELECT_ALL_USER);
    res.status(200).json({
      success: true,
      msg: "get user list success",
      data: result[0],
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      msg: "get user list error",
    });
  } finally {
    conn.release();
  }
};

// 유저 이름 이메일 업데이트
exports.updateUser = async (req, res) => {
  const conn = await res.pool.getConnection();
  const conn2 = await res.pool.getConnection();
  try {
    const { id } = req.params;
    let { username, email } = req.body;
    console.log(id, username, email);

    const userData = await conn2.query(query.SELECT_USER_BY_ID, [id]);
    if (userData[0].length == 0) {
      res.status(400).json({
        success: false,
        msg: "user not found",
      });
      return;
    }

    if (username == undefined) username = userData[0][0].username;
    if (email == undefined) email = userData[0][0].email;

    await conn.query(query.UPDATE_USER_NAME_EMAIL, [username, email, id]);
    res.status(200).json({
      success: true,
      msg: "update user success",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      msg: "update user error",
    });
  } finally {
    conn.release();
    conn2.release();
  }
};

// 유저 삭제
exports.deleteUser = async (req, res) => {
  const conn = await res.pool.getConnection();
  try {
    const { id } = req.params;
    await conn.query(query.DELETE_USER_BY_ID, [id]);
    res.status(200).json({
      success: true,
      msg: "delete user success",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      msg: "delete user error",
    });
  } finally {
    conn.release();
  }
};

// 유저 권한 수정
exports.updateUserAuthority = async (req, res) => {
  const conn = await res.pool.getConnection();
  try {
    const { id } = req.params;
    const { authority } = req.body;

    if (authority != 1 && authority != 0) {
      res.status(400).json({
        success: false,
        msg: "invalid authority",
      });
    }

    const result = await conn.query(query.UPDATE_USER_AUTHORITY, [
      authority,
      id,
    ]);
    res.status(200).json({
      success: true,
      msg: "update user authority success",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      msg: "update user authority error",
    });
  } finally {
    conn.release();
  }
};
