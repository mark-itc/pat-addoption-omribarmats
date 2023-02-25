const UsersDAO = require("../models/UsersDAO");
const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken || accessToken === "null") {
    console.log("Failed to authnticate");
    return res
      .status(500)
      .json({ message: "User not logged in!", success: false });
  }

  try {
    const validToken = verify(accessToken, process.env.JWT_SECRET);
    req.user = validToken;
    if (validToken) {
      console.log("user authnticated");
      return next();
    }
  } catch (err) {
    console.log("Failed to authnticate");
    return res.json({ error: err });
  }
};

module.exports = { validateToken };
