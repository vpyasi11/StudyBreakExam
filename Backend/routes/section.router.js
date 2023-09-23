const express = require("express");
const router = express.Router();
const {
  addSections,
  updateSections,
  getAllSection,
  getSectionByID,
  updateSectionStatus,
  getActiveSectionsCount,
} = require("../controllers/section.controller");
const authorizationHeader = require("../middleware/authJWT");

//API to get section data
router.get("/getsectionbyid/:id", getSectionByID);
router.get("/getallsections", getAllSection);
// API to add new section to a test formation
router.post("/addsections", addSections);
router.post("/updatesections", updateSections);
router.post("/updatesectionstatus", updateSectionStatus);
router.get("/getsectionscount", getActiveSectionsCount);

module.exports = router;
