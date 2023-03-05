const PetsDAO = require("../models/PetsDAO");
const { AddPetValidation } = require("../validations/PetsValidations");

module.exports = class PetsController {
  static async AddPet(req, res) {
    try {
      const validRequest = AddPetValidation(req.body);
      if (!validRequest) {
        return res.status(400).json({
          success: false,
          message: "Please fill all fields",
          fields: req.body,
        });
      }

      const petObject = req.body;

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
      const output = Object.fromEntries(
        Object.entries(req.params).map(([key, value]) =>
          value === "true" ? [key, key] : [key, null]
        )
      );

      const searchObject = {
        $and: [],
      };

      if (
        output.Dog == null ||
        output.Cat == null ||
        output.F == null ||
        output.M == null ||
        output.Sheltered == null ||
        output.Fostered == null ||
        output.Adopted == null ||
        output.Sheltered == null ||
        output.Fostered == null ||
        output.Adopted == null ||
        output.h20 == null ||
        output.h40 == null ||
        output.h60 == null ||
        output.h80 == null ||
        output.w10 == null ||
        output.w20 == null ||
        output.w30 == null ||
        output.w40 == null
      ) {
        searchObject.$and.push({
          type: { $in: ["Dog", "Cat"].filter(Boolean) },
        });
      }

      if (output.Dog !== null || output.Cat !== null) {
        searchObject.$and.push({
          type: { $in: [output.Dog, output.Cat].filter(Boolean) },
        });
      }

      if (output.F !== null || output.M !== null) {
        searchObject.$and.push({
          gender: { $in: [output.F, output.M].filter(Boolean) },
        });
      }

      if (
        output.Sheltered !== null ||
        output.Fostered !== null ||
        output.Adopted !== null
      ) {
        searchObject.$and.push({
          status: {
            $in: [output.Sheltered, output.Fostered, output.Adopted].filter(
              Boolean
            ),
          },
        });
      }

      if (
        output.h20 !== null ||
        output.h40 !== null ||
        output.h60 !== null ||
        output.h80 !== null
      ) {
        output.h20 !== null ? (output.h20 = "10-20") : null;
        output.h40 !== null ? (output.h40 = "21-40") : null;
        output.h60 !== null ? (output.h60 = "41-60") : null;
        output.h80 !== null ? (output.h80 = "61-80") : null;

        searchObject.$and.push({
          height: {
            $in: [output.h20, output.h40, output.h60, output.h80].filter(
              Boolean
            ),
          },
        });
      }

      if (
        output.w10 !== null ||
        output.w20 !== null ||
        output.w30 !== null ||
        output.w40 !== null
      ) {
        output.w10 !== null ? (output.w10 = "0-10") : null;
        output.w20 !== null ? (output.w20 = "11-20") : null;
        output.w30 !== null ? (output.w30 = "21-30") : null;
        output.w40 !== null ? (output.w40 = "31-40") : null;
        searchObject.$and.push({
          weight: {
            $in: [output.w10, output.w20, output.w30, output.w40].filter(
              Boolean
            ),
          },
        });
      }

      const allPets = await PetsDAO.getAllPets(searchObject);
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
      console.log(`Error in PetsController.GetOnePet ${e}`);

      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async Getuserpets(req, res) {
    try {
      const saved = req.saved ? await PetsDAO.GetManyPets(req.saved) : [];

      const fostering = req.fostering
        ? await PetsDAO.GetManyPets(req.fostering)
        : [];

      const adopted = req.adopted ? await PetsDAO.GetManyPets(req.adopted) : [];

      return res.status(200).json({
        success: true,
        saved,
        fostering,
        adopted,
      });
    } catch (e) {
      console.log(`Error in PetsController.Getsavedpets ${e}`);

      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }

  static async updatePet(req, res) {
    try {
      console.log("tryng to update");
      const { name } = req.params;

      const petData = req.body;

      if (req.file) {
        petData.file = "http://localhost:3001/" + req.file.path;
      } else {
        petData.file = req.body.currentFile;
      }

      const user = await PetsDAO.updatePet(petData, name);

      return res.status(200).json({
        success: true,
        message: "Pet updated",
      });
    } catch (e) {
      console.log(`Error in PetsController.updatePet ${e}`);

      return res.status(500).json({
        success: false,
        message: "unknown error",
      });
    }
  }
};
