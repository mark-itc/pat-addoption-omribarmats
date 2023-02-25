const { ObjectId } = require("mongodb");

let collection;

module.exports = class PetsDAO {
  static async injectDB(connection) {
    if (!connection) return;

    try {
      collection = await connection.collection("pets");
    } catch (e) {
      console.log(`Could not establish connection to users collection ${e}`);
    }
  }

  static async createPet(petData) {
    petData.created_at = new Date();
    await collection.insertOne({ ...petData });
  }

  static async getAllPets() {
    return await collection.find({}).toArray();
  }

  static async GetOnePet(name) {
    return await collection.findOne({ name: name });
  }
};
