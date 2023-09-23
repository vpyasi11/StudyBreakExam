const enrollmentModel = require("../models/enrollment.model");
const testFormationModel = require("../models/testFormation.model");
const userModel = require("../models/user.model");
const mongoose = require("mongoose");

const enrollTest = async (req, res) => {
  const { emailIds, testId, examinationTime, testValidityTime } = req.body;

  try {
    console.log(emailIds.length);
    let i = 0;
    while (i < emailIds.length) {
      const email = emailIds[i];
      console.log(email, "email from array");

      const emailChecking = await userModel.findOne({ email });
      console.log(emailChecking, "checking from db");

      const duplicateCheck = await enrollmentModel.findOne({userID: email})

      const userobj = {
        userID: email,
        testID: testId,
        examinationStartTime: examinationTime,
        examinationEndTime: testValidityTime,
      };

      if (emailChecking !== null && duplicateCheck == null ) {
        let success = await enrollmentModel(userobj).save();
        console.log(success);
      }

      if(duplicateCheck){
        return res.json({
          msg: "User already registered for the test"
        })
      }
      if(emailChecking == null ){
        return res.json({
          msg: "User doesnt't exist"
        })
      }
      i++;
    }
    res.status(200).json({
      msg: `user is registerd successfully`,
    });
  } catch (error) {
    return res.status(400).json({
      msg: `${error}`,
    });
  }
};

const testSubmit = async (req, res) => {
  const { responses, testID, email } = req.body;

  try {
    const testData = await testFormationModel
      .findOne({ _id: testID })
      .populate({
        path: "sectionData",
        model: "section",
        populate: {
          path: "questions",
          model: "question",
        },
      });
    // console.log(testData);
    return res.status(201).json({
      message: "test completed successfully",
      // marks: marks,
      responses: responses,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const testStart = async (req, res) => {
  const { testID, userID } = req.body;
  try {
    // const test = await testFormationModel.find();
    const testData = await testFormationModel
      .findOne({ _id: testID })
      .populate({
        path: "sectionData",
        model: "section",
        populate: {
          path: "questions",
          model: "question",
        },
      });

    for (let i = 0; i < testData.sectionData.length; i++) {
      for (let j = 0; j < testData.sectionData[i].questions.length; j++) {
        testData.sectionData[i].questions[j]["correctTextAnswer"] = "";
        testData.sectionData[i].questions[j]["solution"] = "";
        testData.sectionData[i].questions[j]["solutionImage"] = "";
        if (testData.sectionData[i].questions[j].type != "singleBased") {
          for (
            let k = 0;
            k < testData.sectionData[i].questions[j].subQuestions.length;
            k++
          ) {
            testData.sectionData[i].questions[j].subQuestions[
              k
            ].correctTextAnswer = "";
            testData.sectionData[i].questions[j].subQuestions[k].solution = "";
            testData.sectionData[i].questions[j].subQuestions[k].solutionImage =
              "";
          }
        }
      }
    }

    const userId = await enrollmentModel.findOne({ userID });
    console.log(userId);
    if (userId) {
      return res.json({
        testData,
      });
    } else {
      return res.json({
        msg: "You have not enrolled for this test",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "testStart error" });
  }
};

const enrollmentByUsername = async (req, res) => {
  try {
    const {userID} = req.body; 
    const enrolledUser = await enrollmentModel.find({ userID }); 
    
    if (!enrolledUser) {
      return res.status(404).json({
        status: 'error',
        message: 'Enrollment not found.'
      });
    }
    
    res.status(200).json({
      status: 'Found',
      data: enrolledUser
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Internal server error.'
    });
  }
};


module.exports = { enrollTest, testSubmit, testStart, enrollmentByUsername };
