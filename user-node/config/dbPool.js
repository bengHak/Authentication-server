const mysql = require("mysql2");

module.exports = async (req, res, next) => {
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "sdc0123!",
    database: "personal_project",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 20,
  });

  res.pool = pool.promise();
  next();
};
