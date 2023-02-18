require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { initDB } = require("./models/init");
const UsersController = require("./controllers/UsersController");
const { validateToken } = require("./middleware/authMiddleware");
const { Router } = require("express");

initDB();

const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(cors());
app.post("/register", UsersController.Register);
app.post("/login", UsersController.Login);
app.get("/auth", validateToken, UsersController.Auth);

app.listen(3001, async () => {
  console.log("Server is running on port 3001");
});
