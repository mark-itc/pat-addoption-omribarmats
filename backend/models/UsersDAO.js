const { ObjectId } = require("mongodb");

let collection;

module.exports = class UsersDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      collection = await connection.collection("users");
    } catch (e) {
      console.log(`Could not establish connection to users collection ${e}`);
    }
  }

  static async createUser(userData) {
    userData.created_at = new Date();
    userData.role = "user";
    await collection.insertOne({ ...userData });
  }

  static async getUserByUsername(userName) {
    return await collection.findOne({ userName });
  }

  static async getUserByEmail(email) {
    return await collection.findOne({ email });
  }

  static async updateUser(userData) {
    await collection.updateOne({ _id: userData._id }, { $set: { userData } });
  }

  static async getUserById(userId) {
    return await collection.findOne({ _id: new ObjectId(userId) });
  }

  static async getAllUsers() {
    return await collection.find({}).toArray();
  }
  static async GetOneUser(userName) {
    return await collection.findOne({ userName: userName });
  }
};
