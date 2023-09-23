const express = require("express");
const enrollmentRouter = express.Router();
const authorizationHeader = require("../middleware/authJWT");

const {enrollTest, testSubmit,testStart, enrollmentByUsername} = require("../controllers/enrollment.controller")

enrollmentRouter.post('/enrolluser', enrollTest)
enrollmentRouter.post('/submit',authorizationHeader, testSubmit)
enrollmentRouter.post('/teststart', testStart)
enrollmentRouter.post('/userenrollments', enrollmentByUsername)

module.exports = enrollmentRouter