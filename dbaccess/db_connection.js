const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let database;

async function getDataBase() {
  const client = MongoClient.connect("mongodb://localhost:27017");

  database = (await client).db("React_Python_Node");

  if (!database) {
    console.log("database not connected");
  }
  return database;
}

module.exports = { getDataBase };
