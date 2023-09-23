const testFormationModel = require("../models/testFormation.model");
const sectionModel = require("../models/section.model");
const questionModel = require("../models/question.model");
const mongoose = require("mongoose");

const addTestFormation = async (req, res) => {
  try {
    const {
      testName,
      instructions,
      numberOfSections,
      sectionData,
      totalDuration,
      hasSectionDivision,
      hasEndTest,
      hasTestCutOff,
      testCutOff,
      hasOnlineCalculator,
      status,
    } = req.body;
    const session = await mongoose.startSession();

    await session.withTransaction(async () => {
      let sectionIds = [];
      let questionIds = [];
      let subQuestionIds = [];
      let time = 0;
      for (
        let i = 0;
        i < sectionData.length;
        i++ //Don't replace this with forEach
      ) {
        const {
          sectionName,
          sectionType,
          numberOfQuestions,
          questions,
          sectionDuration,
          sectionCutOff,
          calculatorRequired,
          sectionEndProvision,
          status,
        } = sectionData[i];

        questionIds = [];
        for (let j = 0; j < questions.length; j++) {
          const {
            type,
            question,
            questionImage,
            hasOptions,
            availableOptions,
            correctTextAnswer,
            subQuestions,
            solution,
            solutionImage,
            topic,
            subTopic,
            difficultyLevel,
            markingScheme,
            status,
          } = questions[j];

          subQuestionIds = [];
          for (let k = 0; k < subQuestions.length; k++) {
            const {
              type,
              question,
              questionImage,
              hasOptions,
              availableOptions,
              correctTextAnswer,
              solution,
              solutionImage,
              topic,
              subTopic,
              difficultyLevel,
              markingScheme,
              status,
            } = subQuestions[k];

            // Create a new sub question
            const subQuestion = new questionModel({
              type,
              question,
              questionImage,
              hasOptions,
              availableOptions,
              correctTextAnswer,
              solution,
              solutionImage,
              topic,
              subTopic,
              difficultyLevel,
              markingScheme,
              status,
            });
            let element = await subQuestion.save();
            subQuestionIds.push(element._id);
          }

          // Create a new Question
          const parentQuestion = new questionModel({
            type,
            question,
            questionImage,
            hasOptions,
            availableOptions,
            correctTextAnswer,
            subQuestions: subQuestionIds,
            solution,
            solutionImage,
            topic,
            subTopic,
            difficultyLevel,
            markingScheme,
            status,
          });
          let element = await parentQuestion.save();
          questionIds.push(element._id);
        }

        // Create a new section
        const sections = new sectionModel({
          sectionName,
          sectionType,
          numberOfQuestions,
          questions: questionIds,
          sectionDuration,
          sectionCutOff,
          calculatorRequired,
          sectionEndProvision,
          status,
        });
        time += Number(sectionDuration);
        let element = await sections.save();
        sectionIds.push(element._id);
      }

      const testFormations = new testFormationModel({
        testName,
        instructions,
        numberOfSections,
        sectionData: sectionIds,
        totalDuration: time,
        hasSectionDivision,
        hasEndTest,
        hasTestCutOff,
        testCutOff,
        hasOnlineCalculator,
        status,
      });
      // console.log(sectionIds);
      await testFormations.save();
    });

    session.endSession();

    res.status(201).json({ message: "Test formation created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTestFormation = async (req, res) => {
  const session = await mongoose.startSession();

  const {
    testName,
    instructions,
    numberOfSections,
    sectionData,
    totalDuration,
    hasSectionDivision,
    hasEndTest,
    hasTestCutOff,
    testCutOff,
    hasOnlineCalculator,
    status,
  } = req.body;

  session.withTransaction(async () => {
    try {
      const testFormation = await testFormationModel.findById(req.body._id);

      // console.log("SECTION DATA", sectionData);
      let testDuration = 0;
      const sectionIds = [];
      if (testFormation) {
        if (sectionData) {
          // console.log("Quesitons", sectionData[0].questions)
          let questionIds = [];
          let subQuestionIds = [];
          for (var i = 0; i < sectionData.length; i++) {
            const sectionsData = sectionData[i];
            const sectionId = sectionData[i]._id;

            if (sectionId) {
              questionIds = [];
              for (var j = 0; j < sectionsData.questions.length; j++) {
                const questionsData = sectionsData.questions[j];
                const questionId = sectionsData.questions[j]._id;

                //Question
                if (questionId) {

                  //Sub Question
                  subQuestionIds = [];
                  for (var k = 0; k < questionsData.subQuestions.length; k++) {
                    const subQuestionsData = questionsData.subQuestions[k];
                    const subQuestionId = questionsData.subQuestions[k]._id;

                    if (subQuestionId) {
                      await questionModel
                        .findByIdAndUpdate(subQuestionId, subQuestionsData, {
                          new: true,
                        })
                        .catch((err) => console.log(err));

                      subQuestionIds.push(subQuestionId);
                    } else {
                      // If the question doesn't have an _id, create a new question
                      const subQuestion = new questionModel(subQuestionsData);
                      const savedSubQuestion = await subQuestion.save();
                      subQuestionIds.push(savedSubQuestion._id);
                    }
                    questionsData.subQuestions = subQuestionIds;
                  }

                  await questionModel
                    .findByIdAndUpdate(questionId, questionsData, { new: true })
                    .catch((err) => console.log(err));

                  questionIds.push(questionId);
                } else {
                  // If the question doesn't have an _id, create a new question
                  const question = new questionModel(questionsData);
                  const savedQuestion = await question.save();
                  questionIds.push(savedQuestion._id);
                }
                
                sectionsData.questions = questionIds;
                // sectionsData.numberOfQuestions = sectionDetails.questions.length;
              }

              await sectionModel
                .findByIdAndUpdate(sectionId, sectionsData, { new: true })
                .catch((err) => console.log(err));

              sectionIds.push(sectionId);
              testDuration += Number(sectionsData.sectionDuration);
            } else {
              // If the section doesn't have an _id, create a new section
              // create question and sub questions of the section  

              questionIds = [];
              for (var j = 0; j < sectionsData.questions.length; j++) {
                const questionsData = sectionsData.questions[j];

                //Sub Question
                subQuestionIds = [];
                for (var k = 0; k < questionsData.subQuestions.length; k++) {
                  const subQuestionsData = questionsData.subQuestions[k]; 

                  // If the question doesn't have an _id, create a new question
                  const subQuestion = new questionModel(subQuestionsData);
                  const savedSubQuestion = await subQuestion.save();
                  subQuestionIds.push(savedSubQuestion._id);
                  questionsData.subQuestions = subQuestionIds;
                }

                // If the question doesn't have an _id, create a new question
                const question = new questionModel(questionsData);
                const savedQuestion = await question.save();
                questionIds.push(savedQuestion._id);
                
                sectionsData.questions = questionIds;
                sectionsData.numberOfQuestions = sectionsData.questions.length;
              }
              sectionsData.questions = questionIds;
              sectionsData.numberOfQuestions = sectionsData.questions.length;

              const section = new sectionModel(sectionsData);
              const savedSection = await section.save();
              sectionIds.push(savedSection._id);
              testDuration += Number(sectionsData.sectionDuration);
            }
          }
          testFormation.sectionData = sectionIds;
          testFormation.numberOfSections = sectionData.length;
          testFormation.totalDuration = testDuration;
        }

        testFormation.testName = testName;
        testFormation.instructions = instructions;
        testFormation.hasSectionDivision = hasSectionDivision;
        testFormation.hasEndTest = hasEndTest;
        testFormation.hasTestCutOff = hasTestCutOff;
        testFormation.testCutOff = testCutOff;
        testFormation.hasOnlineCalculator = hasOnlineCalculator;
        testFormation.status = status;

        await testFormation.save();
        res
          .status(201)
          .json({ message: "Test formation updated successfully" });
      } else {
        res.status(404).send({
          message: "Test Formation Not Found!",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  session.endSession();
};

const getTestFormationByID = async (req, res) => {
  try {
    const testFormations = await testFormationModel
      .findById(req.params.id)
      .populate({
        path: "sectionData",
        model: "section",
        populate: {
          path: "questions",
          model: "question",
          populate: {
            path: "subQuestions",
            model: "question",
          },
        },
      })
      .exec();

    res.send(testFormations);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllTestFormation = async (req, res) => {
  try {
    const testFormations = await testFormationModel.find().populate({
      path: "sectionData",
      populate: {
        path: "questions",
        populate: {
          path: "subQuestions",
          model: "question",
        },
        model: "question",
      },
      model: "section",
    });

    res.send(testFormations);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTestById = async (req, res) => {
  let id = req.params.id;
  try {
    const element = await testFormationModel.findById(id).populate({
      path: "sectionData",
      model: "section",
    });
    const session = await mongoose.startSession();
    let subSections = element.sectionData;
    await session.withTransaction(async () => {
      if (subSections) {
        for (let i = 0; i < subSections.length; i++) {
          // console.log(subSections[i]._id.toString());
          await section.deleteOne({
            _id: subSections[i]._id.toString(),
          });
        }
      }
      await testFormationModel.deleteOne({ _id: id });
    });
    session.endSession();

    res.status(201).json({ message: "Test was deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTestFormationStatus = async (req, res) => {
  let id = req.body.id;
  let testStatus = req.body.status;
  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      await testFormationModel.updateOne(
        { _id: id },
        { $set: { status: testStatus } }
      );
    });
    session.endSession();

    res.status(201).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getActiveTestsCount = async (req, res) => {
  try {
    const testCount = await testFormationModel.aggregate([
      { $match: { status: true } },
      { $count: "active_tests" },
    ]);
    res.send(testCount);
  } catch (error) {
    console.log("Error:", error);
    console.log(error);
    res.status(400).json({ message: "Server error" });
  }
};

module.exports = {
  addTestFormation,
  updateTestFormation,
  getTestFormationByID,
  getAllTestFormation,
  deleteTestById,
  updateTestFormationStatus,
  getActiveTestsCount,
};
