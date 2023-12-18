const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017/";
const atlas =
  "mongodb+srv://bradenskiffington:Skiff_21@cluster0.kujhuul.mongodb.net/";

// const pool = new MongoClient(uri);
const pool = new MongoClient(atlas);

module.exports = pool;
