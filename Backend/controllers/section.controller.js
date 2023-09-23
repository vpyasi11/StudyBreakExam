const section = require("../models/section.model");
const testFormation = require("../models/testFormation.model");
const questionModel = require("../models/question.model");
const mongoose = require("mongoose");

const getSectionByID = async (req, res) => {
  try {
    const sections = await section.findById(req.params.id).populate({
      path: "questions",
      model: "question",
    });

    res.send(sections);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllSection = async (req, res) => {
  try {
    const sections = await section.find().populate({
      path: "questions",
      model: "question",
    });

    res.send(sections);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to add sections to a already created test formation
const addSections = async (req, res) => {
  try {
    const session = await mongoose.startSession();
    let sectionIDs = [];
    session.withTransaction(async () => {
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
      } = req.body;

      // Create a new section
      const sections = new section({
        sectionName,
        sectionType,
        numberOfQuestions,
        questions,
        sectionDuration,
        sectionCutOff,
        calculatorRequired,
        sectionEndProvision,
        status,
      });

      let sectionID = await sections.save();
      const testFormations = await testFormation.findById(
        req.body.testFormationID
      );
      if (testFormations) {
        sectionIDs = testFormations.sectionData;
        sectionIDs.push(sectionID._id);
        testFormations.sectionData = sectionIDs;

        await testFormations.save();
      }
    });
    session.endSession();

    res.status(201).json({
      message: "Section created and mapped to test formation successfully",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to update sections
const updateSections = async (req, res) => {
  const session = await mongoose.startSession();

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
  } = req.body;

  session.withTransaction(async () => {
    try {
      const sectionsData = req.body;
      const sectionId = sectionsData._id;
      let questionIds = [];
      let subQuestionIds = [];

      // console.log(questions);
      for (var j = 0; j < questions.length; j++) {
        const questionsData = questions[j];
        const questionId = questions[j]._id;

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
        sectionsData.numberOfQuestions = sectionsData.questions.length;
      }

      await section
        .findByIdAndUpdate(sectionId, sectionsData, { new: true })
        .catch((err) => console.log(err));

      res.status(201).json({ message: "Section updated successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  session.endSession();
};

const updateSectionStatus = async (req, res) => {
  let id = req.body.id;
  let sectionStatus = req.body.status;
  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      await section.updateOne({ _id: id }, { $set: { status: sectionStatus } });
    });
    session.endSession();

    res.status(201).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getActiveSectionsCount = async (req, res) => {
  try {
    const sectionCount = await section.aggregate([
      { $match: { status: true } },
      { $count: "active_sections" },
    ]);
    res.send(sectionCount);
  } catch (error) {
    console.log("Error:", error);
    console.log(error);
    res.status(400).json({ message: "Server error" });
  }
};

module.exports = {
  addSections,
  updateSections,
  getAllSection,
  getSectionByID,
  updateSectionStatus,
  getActiveSectionsCount,
};
