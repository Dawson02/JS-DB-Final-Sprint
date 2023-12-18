const { ObjectId } = require("mongodb");
const mdb = require("./mdb");

async function getCarAccessories() {
  if (DEBUG) console.log("mongo.car_accessories.db.getCarAccessories()");
  try {
    await mdb.connect();
    const cursor = mdb.db("CarSearchEngine").collection("FinalSprint").find();
    const results = await cursor.toArray();
    return results;
  } catch (error) {
    console.error("Error occurred while connecting to MongoDB:", error);
    throw error;
  } finally {
    mdb.close();
  }
}

async function searchCarAccessories(query) {
  if (DEBUG) console.log("mongo.car_accessories.db.searchCarAccessories()");
  try {
    await mdb.connect();
    const database = mdb.db("CarSearchEngine");
    const collection = database.collection("FinalSprint");
    const result = await collection
      .find({
        $or: [
          { id: { $regex: new RegExp(query, "i") } },
          { name: { $regex: new RegExp(query, "i") } },
          { description: { $regex: new RegExp(query, "i") } },
          { price: { $regex: new RegExp(query, "i") } },
          { discontinued: { $regex: new RegExp(query, "i") } },
          { categories: { $regex: new RegExp(query, "i") } },
        ],
      })
      .toArray();
    return result;
  } catch (error) {
    console.error("Error occurred while connecting to MongoDB:", error);
    throw error;
  } finally {
    mdb.close();
  }
}

module.exports = {
  getCarAccessories,
  searchCarAccessories,
};
