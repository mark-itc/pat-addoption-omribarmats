const Ajv = require("ajv");
const ajv = new Ajv();

module.exports.AddPetValidation = ajv.compile({
  type: "object",
  properties: {
    name: { type: "string" },
    type: { type: "string" },
    birthdate: { type: "string" },
    gender: { type: "string" },
    breed: { type: "string" },
    height: { type: "string" },
    status: { type: "string" },
    weight: { type: "string" },
    color: { type: "string" },
    hypoallergenic: { type: "string" },
    diet: { type: "string" },
    bio: { type: "string" },
    file: { type: "object" },
  },
  required: [
    "name",
    "type",
    "birthdate",
    "gender",
    "breed",
    "status",
    "height",
    "weight",
    "color",
    "hypoallergenic",
    "diet",
    "bio",
  ],
  additionalProperties: false,
});

module.exports.LoginValidation = ajv.compile({
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
});
