const express = require("express");
const register = require("../controllers/register.controller");

const router = express.Router();

router.use("/register", register);

module.exports = router;
