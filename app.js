const express = require("express");
const app = express();
const dbo = require("./main/dbaccess/model_details_access");
const { ObjectId } = require("mongodb");

app.get("/login/:id", async (req, res) => {
  pipeline = [
    {
      $match: {
        _id: new ObjectId(req.params.id),
      },
    },
  ];

  const employee = await dbo.aggregateModel(pipeline, "user_login");
  res.send(employee);
});

app.post("/login", async (req, res) => {
  let datas = await dbo.insertModel(
    { name: "ajith", email: "ddcsdcds" },
    "user_login"
  );
  res.send(datas);
});

app.listen(8000, () => {});
