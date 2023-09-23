const questionModel = require("../models/question.model");
const mongoose = require("mongoose");

// Controller function to add questions (Single, Set, Essay)
const addQuestions = async (req, res) => {
  try {
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
    } = req.body;
    const session = await mongoose.startSession();
    let id = "";
    await session.withTransaction(async () => {
      let subQuestionIds = [];
      if (subQuestions) {
        for (let i = 0; i < subQuestions.length; i++) {
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
          } = subQuestions[i];

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
      }

      const questions = new questionModel({
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
      // console.log(subQuestionIds);
      let ele = await questions.save();
      id = ele._id;
    });

    session.endSession();

    res.status(201).json({ message: "Questions created successfully", id: id });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to Update Questions by ID new:
const updateQuestionsById = async (req, res) => {
  const id = req.params.id; // Get the question ID from the request body

  try {
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
    } = req.body;

    // Create an object with only the fields that have been modified
    const updatedFields = {
      type,
      question,
      questionImage,
      hasOptions,
      availableOptions,
      correctTextAnswer,
      solution,
      solutionImage,
      subQuestions,
      topic,
      subTopic,
      difficultyLevel,
      markingScheme,
      status,
    };

    // Remove any undefined fields from the updatedFields object
    Object.keys(updatedFields).forEach((key) => {
      if (
        typeof updatedFields[key] === "undefined" ||
        updatedFields[key] == "" ||
        updatedFields[key] == null
      ) {
        delete updatedFields[key];
      }
    });

    // console.log("Updated Fields", updatedFields);
    // If subQuestions is provided, process the subQuestions separately
    if (subQuestions && Array.isArray(subQuestions)) {
      const subQuestionIds = [];
      for (let i = 0; i < subQuestions.length; i++) {
        const subQuestionData = subQuestions[i];
        const subQuestionId = subQuestionData._id;

        if (subQuestionId) {
          // If the subQuestion has an _id, update the subQuestion
          await questionModel.findByIdAndUpdate(
            subQuestionId,
            subQuestionData,
            {
              new: true,
            }
          );
          subQuestionIds.push(subQuestionId);
        } else {
          // If the subQuestion doesn't have an _id, create a new subQuestion
          const subQuestion = new questionModel(subQuestionData);
          const savedSubQuestion = await subQuestion.save();
          subQuestionIds.push(savedSubQuestion._id);
        }
      }
      updatedFields.subQuestions = subQuestionIds;
    }
    console.log(updatedFields);
    // Perform the partial update using the $set operator
    const updatedResult = await questionModel.findByIdAndUpdate(
      id,
      { $set: updatedFields },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Question was updated successfully", updatedResult });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to delete questions
//need to check if we can replace delete option - Snehal
const deleteQuestions = async (req, res) => {
  let id = req.params.id;
  try {
    const element = await questionModel.findById(id).populate({
      path: "subQuestions",
      model: "question",
    });
    const session = await mongoose.startSession();
    let subQuestions = element.subQuestions;
    await session.withTransaction(async () => {
      if (subQuestions) {
        for (let i = 0; i < subQuestions.length; i++) {
          console.log(subQuestions[i]._id.toString());
          await questionModel.deleteOne({
            _id: subQuestions[i]._id.toString(),
          });
        }
      }
      await questionModel.deleteOne({ _id: id });
    });
    session.endSession();

    res.status(201).json({ message: "Question was deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Change question status
const updateQuestionStatus = async (req, res) => {
  let id = req.body.id;
  let quesStatus = req.body.status;
  console.log(id);

  try {
    const session = await mongoose.startSession();
    await session.withTransaction(async () => {
      await questionModel.updateOne(
        { _id: id },
        { $set: { status: quesStatus } }
      );
    });
    session.endSession();

    res.status(201).json({ message: "Status updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// get all questions
const getAllQuestions = async (req, res) => {
  try {
    // Retrieve all questions from the database
    const questions = await questionModel.find().populate({
      path: "subQuestions",
      model: "question",
    });

    res.status(200).json({ questions });
  } catch (error) {
    console.error("Error retrieving questions:", error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving questions" });
  }
};

const getActiveTestsCount = async (req, res) => {
  try {
    const questionCount = await questionModel.aggregate(
      [{ $match: { status: true } }, { $count: "active_ques" }]
    );
    res.send(questionCount);
  } catch (error) {
    console.log("Error:", error);
    console.log(error);
    res.status(400).json({ message: "Server error" });
  }
};

module.exports = {
  addQuestions,
  updateQuestionsById,
  deleteQuestions,
  getAllQuestions,
  updateQuestionStatus,
  getActiveTestsCount,
};
