// USER
exports.SELECT_USER = `SELECT * FROM users WHERE id = ?`;
exports.SELECT_USER_BY_USERNAME = `SELECT * FROM users WHERE username = ?`;
exports.SELECT_USER_BY_EMAIL = `SELECT * FROM users WHERE email = ?`;
exports.INSERT_USER = `INSERT INTO users (email, password, username, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`;
exports.UPDATE_USER_USERNAME = `UPDATE users SET username = ? WHERE id = ?`;
