const PetsDAO = require("../models/PetsDAO");
const { AddPetValidation } = require("../validations/PetsValidations");

module.exports = class PetsController {
  static async AddPet(req, res) {
    try {
      console.log(req.body);
      console.log(req.file);
      const validRequest = AddPetValidation(req.body);
      if (!validRequest) {
        return res.status(400).json({
          success: false,
          message: "Please fill all fields",
          fields: req.body,
        });
      }

      const petObject = req.body;
      // console.log(req.body);
      petObject.file = "http://localhost:3001/" + req.file.path;

      await PetsDAO.createPet(petObject);

      return res.status(200).json({
        success: true,
        message: "new pet added",
      });
    } catch (e) {
      console.log(`Error in PetsController.Register ${e}`);

      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async GetAllPets(req, res) {
    try {
      const allPets = await PetsDAO.getAllPets();

      return res.status(200).json({
        success: true,
        allPets: allPets,
      });
    } catch (e) {
      console.log(`Error in PetsController.AddPet ${e}`);

      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async GetOnePet(req, res) {
    try {
      const { name } = req.params;

      const pet = await PetsDAO.GetOnePet(name);

      return res.status(200).json({
        success: true,
        pet: pet,
      });
    } catch (e) {
      console.log(`Error in PetsController.AddPet ${e}`);

      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }
  GetOnePet;
};
