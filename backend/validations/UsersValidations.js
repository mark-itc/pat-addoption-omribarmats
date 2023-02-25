const Ajv = require("ajv");
const ajv = new Ajv();

module.exports.RegisterValidation = ajv.compile({
  type: "object",
  properties: {
    firstName: { type: "string" },
    lastName: { type: "string" },
    userName: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    city: { type: "string" },
    birthDate: { type: "string" },
    password: { type: "string" },
    rePassword: { type: "string" },
    file: { type: "object" },
    bio: { type: "string" },
  },
  required: [
    "firstName",
    "lastName",
    "userName",
    "email",
    "phone",
    "city",
    "birthDate",
    "password",
    "rePassword",
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
