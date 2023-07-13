const dbo = require("./db_connection");

async function selectModel(query, collection_name) {
  let database = await dbo.getDataBase();
  const collection = database.collection(collection_name);
  const cursor = collection.find(query);
  let data = await cursor.toArray();
  if (!data) {
    return [];
  } else {
    return data;
  }
}

module.exports = { selectModel };
