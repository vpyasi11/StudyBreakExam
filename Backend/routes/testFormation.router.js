const {
  deleteTestById,
  addTestFormation,
  updateTestFormation,
  getTestFormationByID,
  getAllTestFormation,
  updateTestFormationStatus,
  getActiveTestsCount,
} = require("../controllers/testFormation.controller");
const express = require("express");
const router = express.Router();
const authorizationHeader = require("../middleware/authJWT");

// Adding new test formation(test, sections, questions)
router.post("/addtestformations", addTestFormation);

// update a test formation
router.post("/updatetestformation", updateTestFormation);
// get a test formation by ID
router.get("/gettestformation/:id", getTestFormationByID);
// get all test formation
router.get("/getalltestformation", getAllTestFormation);
// delete test formation by ID
router.delete("/deletetestbyid/:id", authorizationHeader, deleteTestById);
// update test formation status
router.post("/updatetestformationstatus", updateTestFormationStatus);
// To get the active tests
router.get("/gettestscount", getActiveTestsCount);

module.exports = router;
