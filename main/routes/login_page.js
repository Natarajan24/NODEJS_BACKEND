const express = require("express");
const router = express.Router();
const dbo = require("../dbaccess/model_details_access");
const { ObjectId } = require("mongodb");
const authMiddleware = require("../jwtToken/authMiddleware");

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

router.get("/", authMiddleware.authenticateToken, async (req, res) => {
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

router.post("/", async (req, res) => {
  pipeline = [
    {
      $match: {
        name: req.body.name,
        email: req.body.email,
        status: true,
      },
    },
  ];

  const employee = await dbo.aggregateModel(pipeline, "user_login");

  const token = authMiddleware.generateToken(
    req.body,
    process.env.JWT_SECRET,
    120
  );

  if (employee) {
    const updateUser = {
      _id: employee[0]._id,
      name: employee[0].name,
      email: employee[0].email,
      status: true,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
    };
    const userUpdate = await dbo
      .updateModel("user_login",employee[0]._id, updateUser)
      .then(() => {
        res.status(200).send("Successfully");
      })
      .catch((error) => {
        res.status(500).send("Error saving user:");
      });
  } else {
    req.body.accessToken = token.accessToken;
    req.body.refreshToken = token.refreshToken;

    const userAdd = await dbo
      .insertModel(req.body, "user_login")
      .then(() => {
        res.status(200).send("Data insert successfully");
      })
      .catch((error) => {
        res.status(500).send("Error saving user:");
      });
  }
});

router.put("/", async (req, res) => {
  const userData = req.body;

  const userId = new ObjectId(req.body._id);
  delete userData._id;

  const userUpdate = await dbo.updateModel("user_login", userId, req.body);
  res.send(userUpdate);
});

router.delete("/", async (req, res) => {
  const userId = new ObjectId(req.body._id);

  const userUpdate = await dbo.deleteModel("user_login", userId);
  res.send(userUpdate);
});

try {
  module.exports = router;
} catch (error) {
  console.log(error);
}
module.exports = router;
