const express = require("express");
const userRouter = require("./user");
const pool = require("./config/dbPool");

const port = 3002;

const app = express();
app.use(express.json());
app.use(pool);

// user router
app.use("/api/user", userRouter);

app.get("/api/user/", (req, res) => {
  res.send("This is user server.");
});

app.listen(port, () => {
  console.log(`User Server listening at http://localhost:${port}`);
});
