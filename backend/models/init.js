const { MongoClient } = require("mongodb");
const UsersDAO = require("./UsersDAO");
// const TasksDAO = require("./TasksDAO");

module.exports.initDB = async function initDB() {
  MongoClient.connect(process.env.MONGODB_URI)
    .then(async (connection) => {
      const db = connection.db(process.env.DB);
      await UsersDAO.injectDB(db);
      // await TasksDAO.injectDB(db);
      console.log("Connection to DB established");
      return;
    })
    .catch((error) => {
      console.log(error);
      console.log(`DB connection failed ${error}`);
      process.exit(1);
    });
};
