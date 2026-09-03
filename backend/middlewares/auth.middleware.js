const jwt = require("jsonwebtoken");

// TODO: unimplemented. The body is empty, so this never calls next() and will
// hang any request it is mounted on. It is deliberately not wired into any
// route yet - implement before using.
const verifyJWT = async (req, res, next) => {
  try {
    return res.status(501).json({ message: "Auth middleware not implemented" });
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { verifyJWT };
