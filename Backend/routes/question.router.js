const express = require("express");
const router = express.Router();
const {
  addQuestions,
  updateQuestionsById,
  deleteQuestions,
  getAllQuestions,
  updateQuestionStatus,
  getActiveTestsCount,
} = require("../controllers/question.controller");
const authorizationHeader = require("../middleware/authJWT");

// POST route for saving a question
router.post("/addquestions", addQuestions);
router.put("/updatequestions/:id", authorizationHeader, updateQuestionsById);
router.get("/getallquestions", getAllQuestions);
router.delete("/deletequestions/:id", authorizationHeader, deleteQuestions);
router.post("/updatequestionstatus", updateQuestionStatus);
router.get("/getquestionscount", getActiveTestsCount);
  
module.exports = router;
