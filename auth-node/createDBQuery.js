const createUserTable = `CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  authority TINYINT NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL,
  updated_at DATETIME NOT NULL,
  PRIMARY KEY (id)
)`;

const queries = [createUserTable];

const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "sdc0123!",
  database: "personal_project",
  waitForConnections: true,
});

pool.getConnection(async (err, conn) => {
  await queries.forEach((query) => {
    try {
      conn.query(query, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          console.log("success ");
        }
      });
    } catch (err) {
      conn.rollback();
      console.log(err);
    } finally {
      console.log("connection released");
      conn.release();
    }
  });

  pool.end();
});
