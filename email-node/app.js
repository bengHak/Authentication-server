const express = require("express");
const mailRouter = require("./mail");
const pool = require("./config/dbPool");

const port = 3004;

const app = express();
app.use(express.json());
app.use(pool);

// mail router
app.use("/api/mail", mailRouter);

app.get("/api/mail/", (req, res) => {
  res.send("This is mail server.");
});

app.listen(port, () => {
  console.log(`Mail server listening at http://localhost:${port}`);
});
