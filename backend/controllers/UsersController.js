const sha256 = require("js-sha256");
const jwt = require("jsonwebtoken");
const UsersDAO = require("../models/UsersDAO");
const {
  RegisterValidation,
  LoginValidation,
} = require("../validations/UsersValidations");

module.exports = class UsersController {
  static async Register(req, res) {
    try {
      const validRequest = RegisterValidation(req.body);
      if (!validRequest) {
        return res.status(400).json({
          success: false,
          message: "Please fill all fields",
        });
      }

      const userObject = req.body;

      const existingUser = await UsersDAO.getUserByUsername(
        userObject.username
      );
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "This username is taken. Please select a different one",
        });
      }

      const existingEmail = await UsersDAO.getUserByEmail(userObject.email);
      if (existingEmail) {
        return res.status(400).json({
          success: false,
          message:
            "This email is already registered. If you already have an account please sign-in",
        });
      }

      userObject.password = sha256(userObject.password);

      await UsersDAO.createUser(userObject);

      const user = await UsersDAO.getUserByEmail(userObject.email);

      const token = jwt.sign(
        {
          user_id: user._id,
          username: user.email,
        },
        process.env.JWT_SECRET
      );

      return res.json({
        token: token,
      });
    } catch (e) {
      console.log(`Error in UsersController.Register ${e}`);
      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async Login(req, res) {
    try {
      console.log(req.body);
      const validRequest = LoginValidation(req.body);

      if (!validRequest) {
        return res.status(400).json({
          success: false,
          message: "Please fill all fields",
        });
      }

      const userObject = req.body;

      const user = await UsersDAO.getUserByEmail(userObject.email);
      if (!user || user.password != sha256(req.body.password)) {
        return res.status(400).json({
          success: false,
          message: "Wrong email or password",
        });
      }

      const token = jwt.sign(
        {
          user_id: user._id,
          username: user.email,
        },
        process.env.JWT_SECRET
      );

      return res.json({
        token: token,
      });
    } catch (e) {
      console.log(`Error in UsersController.Register ${e}`);
      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async Auth(req, res) {
    try {
      console.log("user authenticated");
      res.json(req.user);
    } catch (e) {
      console.log("catch");
    }
  }
};
