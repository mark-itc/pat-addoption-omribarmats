const sha256 = require("js-sha256");
const jwt = require("jsonwebtoken");
const UsersDAO = require("../models/UsersDAO");
const PetsDAO = require("../models/PetsDAO");
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
      userObject.file = "http://localhost:3001/" + req.file.path;

      const existingUser = await UsersDAO.getUserByUsername(
        userObject.userName
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
          userName: user.userName,
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
          userName: user.userName,
          role: user.role,
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

  static async GetAllUsers(req, res) {
    try {
      const allUsers = await UsersDAO.getAllUsers();

      return res.status(200).json({
        success: true,
        allUsers: allUsers,
      });
    } catch (e) {
      console.log(`Error in UsersController.GetAllUsers ${e}`);

      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async GetOneUser(req, res) {
    try {
      const { userName } = req.params;

      const user = await UsersDAO.GetOneUser(userName);

      return res.status(200).json({
        success: true,
        user: user,
      });
    } catch (e) {
      console.log(`Error in UsersController.GetOneUser ${e}`);

      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const { userName } = req.params;
      const { userData } = req.body;

      console.log(userData);

      if (userData.password) {
        userData.password = sha256(userData.password);
      }
      const user = await UsersDAO.updateUser(userData, userName);

      return res.status(200).json({
        success: true,
        message: "User updated",
      });
    } catch (e) {
      console.log(`Error in UsersController.updateUser ${e}`);

      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async Save(req, res) {
    try {
      const userName = req.params.user;
      const pet = req.params.pet;

      await UsersDAO.savePetToUser(userName, pet);

      return res.status(200).json({
        success: true,
        message: "Pet saved",
      });
    } catch (e) {
      console.log(`Error in UsersController.Save ${e}`);

      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async UnSave(req, res) {
    try {
      const userName = req.params.user;
      const pet = req.params.pet;

      await UsersDAO.UnSavePetFromUser(userName, pet);

      return res.status(200).json({
        success: true,
        message: "Pet Unsaved",
      });
    } catch (e) {
      console.log(`Error in UsersController.UnSave ${e}`);

      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async Foster(req, res) {
    try {
      const userName = req.params.user;
      const pet = req.params.pet;
      const fosteredStatus = { status: "Fostered" };

      await UsersDAO.fosterPetToUser(userName, pet);
      await PetsDAO.updatePet(fosteredStatus, pet);

      return res.status(200).json({
        success: true,
        message: "Pet fostered",
      });
    } catch (e) {
      console.log(`Error in UsersController.foster ${e}`);

      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async Adopt(req, res) {
    try {
      const userName = req.params.user;
      const pet = req.params.pet;
      const adoptStatus = { status: "Adopted" };

      console.log(pet);

      await UsersDAO.adoptPetToUser(userName, pet);
      await PetsDAO.updatePet(adoptStatus, pet);

      return res.status(200).json({
        success: true,
        message: "Pet adopted",
      });
    } catch (e) {
      console.log(`Error in UsersController.adopt ${e}`);

      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async Return(req, res) {
    try {
      const userName = req.params.user;
      const pet = req.params.pet;
      const ShelteredStatus = { status: "Sheltered" };

      await UsersDAO.returnPet(userName, pet);
      await PetsDAO.updatePet(ShelteredStatus, pet);

      return res.status(200).json({
        success: true,
        message: "Pet returned",
      });
    } catch (e) {
      console.log(`Error in UsersController.Save ${e}`);

      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async Getuserpets(req, res, next) {
    try {
      const { userName } = req.params;
      const user = await UsersDAO.GetUserPets(userName);

      console.log("1saved", user.saved);
      console.log("1fostering", user.fostering);
      console.log("1adopted", user.adopted);

      req.saved = user.saved;
      req.fostering = user.fostering;
      req.adopted = user.adopted;

      next();
    } catch (e) {
      console.log(`Error in UsersController.GetUserPets ${e}`);

      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }
};
