const dbo = require("./db_connection");

async function selectModel(collection_name) {
  let database;
  try {
    database = await dbo.getDataBase();
    const collection = database.collection(collection_name);
    const cursor = collection.find({});
    let data = await cursor.toArray();

    if (!data) {
      return [];
    } else {
      return data;
    }
  } catch (error) {
    return [];
  } finally {
  }
}

async function insertModel(query, collection_name) {
  let database;
  try {
    database = await dbo.getDataBase();
    const collection = database.collection(collection_name);
    await collection.insertOne(query);
    return "insert successfuly";
  } catch (error) {
    return error;
  } finally {
  }
}

async function aggregateModel(query, collection_name) {
  try {
    database = await dbo.getDataBase();
    const collection = database.collection(collection_name);
    let result = await collection.aggregate(query).toArray();

    if (!result) {
      return [];
    } else {
      return result;
    }
  } catch (error) {
    return error;
  } finally {
  }
}

module.exports = { selectModel, insertModel, aggregateModel };
