const express=require('express');
const healthcheck=require('../controllers/healthcheck.controller.js');
const router = express.Router();

router.post("/healthcheck",healthcheck);

export default router;