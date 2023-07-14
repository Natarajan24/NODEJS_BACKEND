const express = require("express");
const app = express();
const exhbs = require("express-handlebars");
const jwt = require("jsonwebtoken");
const dbo = require("./dbaccess/model_details_access");
const loginRouter = require("./routes/login_page");

app.engine(
  "hbs",
  exhbs.engine({ layoutsDir: "views/", defaultLayout: "main", extname: "hbs" })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use("/login", loginRouter);

app.listen(8000, () => {});
