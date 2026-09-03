const express = require("express");
const healthcheck = require("../controllers/healthcheck.controller.js");

const router = express.Router();

router.get("/healthcheck", healthcheck);

module.exports = router;
