const express = require("express");
const adminRouter = require("./admin");
const pool = require("./config/dbPool");

const port = 3003;

const app = express();
app.use(express.json());
app.use(pool);

// admin router
app.use("/api/admin", adminRouter);

app.get("/api/admin/", (req, res) => {
  res.send("This is admin server.");
});

app.listen(port, () => {
  console.log(`Admin server listening at http://localhost:${port}`);
});
