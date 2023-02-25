require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { initDB } = require("./models/init");
const UsersController = require("./controllers/UsersController");
const PetsController = require("./controllers/PetsController");
const { validateToken } = require("./middleware/authMiddleware");
const multer = require("multer");

initDB();

const app = express();
app.use;
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./" + uploadsDirectory);
  },
  filename: function (req, file, cb) {
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      cb(new Error("Only PNG and JPEG files are allowed."));
      return;
    }

    const newFileName =
      Date.now() + Math.random() * 1000 + "-" + file.originalname;

    cb(null, newFileName);
  },
});

const upload = multer({ storage });

const uploadsDirectory = "uploads";

app.use(express.json());
app.use(cors());
app.use("/" + uploadsDirectory, express.static(uploadsDirectory));
app.post("/register", upload.single("file"), UsersController.Register);
app.post("/login", UsersController.Login);
app.get("/auth", validateToken, UsersController.Auth);

app.post(
  "/addpet",
  validateToken,
  upload.single("file"),
  PetsController.AddPet
);

app.get("/allpets", validateToken, PetsController.GetAllPets);
app.get("/allusers", validateToken, UsersController.GetAllUsers);
app.get("/pet/:name", PetsController.GetOnePet);
app.get("/profile/:userName", validateToken, UsersController.GetOneUser);

app.listen(3001, async () => {
  console.log("Server is running on port 3001");
});
