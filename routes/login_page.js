const express = require("express");
const router = express.Router();
const dbo = require("./dbaccess/model_details_access");

router.get("/login", async (req, res) => {
  pipeline = [
    {
      $match: {
        _id: new ObjectId(""),
      },
    },
  ];

  const employee = await dbo.aggregateModel(pipeline, "user_login");
  res.send(employee);
});

router.post("/login", async (req, res) => {
  let datas = await dbo.insertModel(
    { name: "ajith", email: "ddcsdcds" },
    "user_login"
  );
  res.send(datas);
});