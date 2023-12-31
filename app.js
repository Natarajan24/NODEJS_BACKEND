const express = require("express");
const cors = require("cors");
const app = express();
const loginRouter = require("./main/routes/login_page");
const UserRouter = require("./main/routes/user");

const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/login", loginRouter);
app.use("/user", UserRouter);

app.listen(8000, () => {});
