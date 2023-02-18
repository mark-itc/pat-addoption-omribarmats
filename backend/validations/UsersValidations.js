const Ajv = require("ajv");
const ajv = new Ajv();

module.exports.RegisterValidation = ajv.compile({
  type: "object",
  properties: {
    firstname: { type: "string" },
    lastname: { type: "string" },
    username: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    password: { type: "string" },
    repassword: { type: "string" },
  },
  required: [
    "firstname",
    "lastname",
    "username",
    "email",
    "phone",
    "password",
    "repassword",
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
