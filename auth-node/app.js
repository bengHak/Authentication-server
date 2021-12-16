const express = require("express");
const authRouter = require("./auth");
const pool = require("./config/dbPool");

const port = 3001;

const app = express();
app.use(express.json());
app.use(pool);

// auth router
app.use("/api/auth", authRouter);

app.get("/api/auth/", (req, res) => {
  res.send("This is auth server.");
});

app.listen(port, () => {
  console.log(`Auth server listening at http://localhost:${port}`);
});
