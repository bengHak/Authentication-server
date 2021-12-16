exports.SELECT_ALL_USER = `SELECT id, email, username, authority, created_at, updated_at FROM users`;
exports.SELECT_USER_BY_ID = `SELECT email, username FROM users WHERE id = ?`;
exports.UPDATE_USER_NAME_EMAIL = `UPDATE users SET username = ?, email = ? WHERE id = ?`;
exports.DELETE_USER_BY_ID = `DELETE FROM users WHERE id = ?`;
exports.UPDATE_USER_AUTHORITY = `UPDATE users SET authority = ? WHERE id = ?`;
