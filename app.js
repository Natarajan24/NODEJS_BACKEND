const express = require("express");
const app = express();
const loginRouter = require("./routes/login_page");

app.use("/login", loginRouter);

app.listen(8000, () => {});
