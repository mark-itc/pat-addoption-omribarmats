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
    userData.login_attempts = 0;
    await collection.insertOne({ ...userData });
  }

  static async getUserByUsername(username) {
    return await collection.findOne({ username });
  }

  static async getUserByEmail(email) {
    return await collection.findOne({ email });
  }

  static async updateUser(userData) {
    await collection.updateOne({ _id: userData._id }, { $set: { userData } });
  }

  // create a new method called getUserById
  static async getUserById(userId) {
    return await collection.findOne({ _id: new ObjectId(userId) });
  }
};
