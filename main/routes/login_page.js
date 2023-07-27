const express = require("express");
const router = express.Router();
const dbo = require("../dbaccess/model_details_access");
const { ObjectId } = require("mongodb");

// const mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/React_Python_Node");
// const { Schema } = mongoose;

// const userSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//   },
//   status: {
//     type: Boolean,
//     require: true,
//   },
// });

// const User = mongoose.model("User", userSchema);

// router.get("/", async (req, res) => {
//   pipeline = [
//     {
//       $match: {
//         _id: new ObjectId("64be0dab8a0fc7638f5a98b5"),
//       },
//     },
//   ];

//   const employee = await dbo.aggregateModel(pipeline, "users");

//   res.send(employee);
// });

// router.post("/", async (req, res) => {
//   const newUser = new User(req.body);
//   newUser
//     .save()
//     .then(() => {
//       res.status(200).send("Data retrieved successfully");
//     })
//     .catch((error) => {
//       res.status(500).send("Error saving user:");
//     });
// });

router.post("/", async (req, res) => {
  console.log("122345");
  const userAdd = await dbo
    .insertModel(req.body, "user_login")
    .then(() => {
      res.status(200).send("Data insert successfully");
    })
    .catch((error) => {
      res.status(500).send("Error saving user:");
    });
});

router.get("/", async (req, res) => {
  pipeline = [
    {
      $match: {
        status: true,
      },
    },
  ];
  const employee = await dbo.aggregateModel(pipeline, "user_login");

  res.send(employee);
});

try {
  module.exports = router;
} catch (error) {
  console.log(error);
}
module.exports = router;
