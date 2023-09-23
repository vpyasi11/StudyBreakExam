const express = require("express");
const router = express.Router();
const { addEassyQuestions } = require("../controllers/eassy.controller");
const authorizationHeader = require("../middleware/authJWT");

// POST route for saving a question
router.post("/addEassyQ", authorizationHeader, addEassyQuestions);

module.exports = router;
