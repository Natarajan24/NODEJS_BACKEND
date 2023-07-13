const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const exhbs = require("express-handlebars");
// const dbo = require("./dbaccess/db_connection");
const dbo = require("./dbaccess/model_details_access");
const { ObjectId } = require("mongodb");

app.engine(
  "hbs",
  exhbs.engine({ layoutsDir: "views/", defaultLayout: "main", extname: "hbs" })
);
app.set("view engine", "hbs");
app.set("views", "views");

app.get("/employee_get/:id", async (req, res) => {
  let employee = await dbo.selectModel(
    { _id: new ObjectId(req.params.id) },
    "admin_user"
  );
  res.send(employee);
});

app.listen(8000, () => {});
