const query = require("./query");

// 프로필 불러오기
exports.getProfileById = async (req, res) => {
  const conn = await res.pool.getConnection();
  const { id } = req.params;

  try {
    const profile = await conn.query(query.SELECT_USER_INFO_BY_ID, [id]);
    let newProfile = {
      id: Number(id),
      username: profile[0][0].username,
      email: profile[0][0].email,
    };
    res.json({
      success: true,
      msg: "프로필 조회 성공",
      data: newProfile,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "서버 오류",
    });
  } finally {
    conn.release();
  }
};

// 프로필 가져오기
exports.getProfile = async (req, res) => {
  const conn = await res.pool.getConnection(async (c) => c);
  const { user_id } = res;

  try {
    const profile = await conn.query(query.SELECT_USER_INFO_BY_ID, [user_id]);

    res.json({
      success: true,
      msg: "프로필 조회 성공",
      data: profile[0][0],
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "서버 오류",
      data: "",
    });
  } finally {
    conn.release();
  }
};

// 프로필 수정
exports.updateProfile = async (req, res) => {
  const conn = await res.pool.getConnection();
  const { user_id } = res;
  const { username } = req.body;

  try {
    await conn.query(query.UPDATE_USER_USERNAME, [username, user_id]);
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "서버 오류",
    });
  } finally {
    conn.release();
  }
};
