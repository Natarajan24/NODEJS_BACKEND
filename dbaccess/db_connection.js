const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let database;

async function getDataBase() {
  const client = MongoClient.connect(
    "mongodb+srv://cluster0.1501x.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority&tls=true&tlsCertificateKeyFile=C%3A%5CUsers%5Cnatra%5Cavp+backend%5Cap-backend%5Ckey.pem"
  );
  database = (await client).db("avpdb");

  if (!database) {
    console.log("database not connected");
  }
  return database;
}

module.exports = { getDataBase };
