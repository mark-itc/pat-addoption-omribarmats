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

  static async updateUser(userData, userName) {
    await collection.updateOne({ userName }, { $set: userData });
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

  static async savePetToUser(userName, pet) {
    await collection.updateOne({ userName }, { $push: { saved: pet } });
  }

  static async UnSavePetFromUser(userName, pet) {
    await collection.updateOne({ userName }, { $pull: { saved: pet } });
  }

  static async fosterPetToUser(userName, pet) {
    await collection.updateOne({ userName }, { $push: { fostering: pet } });
  }

  static async adoptPetToUser(userName, pet) {
    await collection.updateOne({ userName }, { $push: { adopted: pet } });
  }

  static async returnPet(userName, pet) {
    await collection.updateOne({ userName }, { $pull: { fostering: pet } });
    await collection.updateOne({ userName }, { $pull: { adopted: pet } });
  }

  static async GetUserPets(userName) {
    console.log("userName", userName);
    return await collection.findOne({ userName: userName });
  }
};
