const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const _env = require("dotenv").config();
const env = process.env;

let database;

async function getDataBase() {
  const client = MongoClient.connect(env.MONGODB_LOCAL_URL);

  database = (await client).db("React_Python_Node");

  if (!database) {
    console.log("database not connected");
  }
  return database;
}

module.exports = { getDataBase };
