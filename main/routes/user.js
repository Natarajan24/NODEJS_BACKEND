const express = require("express");
const router = express.Router();
const dbo = require("../dbaccess/model_details_access");
const { ObjectId } = require("mongodb");


router.get("/", async (req, res) => {
  pipeline = [
    {
      $match: {
        status: true,
      },
    },
  ];
  const employee = await dbo.aggregateModel(pipeline, "user");

  res.send(employee);
});

router.post("/", async (req, res) => {
  const userAdd = await dbo
    .insertModel(req.body, "user")
    .then(() => {
      res.status(200).send("Data insert successfully");
    })
    .catch((error) => {
      res.status(500).send("Error saving user:");
    });
});

router.put("/", async (req, res) => {
  const userData = req.body
  console.log(userData)

  const userId = new ObjectId(req.body._id)
  delete userData._id;

  console.log(userData)
  const userUpdate = await dbo
    .updateModel("user", userId, req.body)
  res.send(userUpdate)
});


router.delete("/", async (req, res) => {

  const userId = new ObjectId(req.body._id)

  const userUpdate = await dbo
    .deleteModel("user", userId)
  res.send(userUpdate)
});


try {
  module.exports = router;
} catch (error) {
  console.log(error);
}
module.exports = router;
