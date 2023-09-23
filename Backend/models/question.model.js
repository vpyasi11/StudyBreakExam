const mongoose = require("mongoose");

//Schema definition
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    // select the type of question (setBased, single or Essay)
    type: {
      type: String,
      required: [true, "Please provide the question type"],
    },
    //question type - text/equation/image editor - these will have only 3 values passed from FE and we will store this directly
    question: {
      type: String,
      required: [true, "Please provide the question name"],
    },
    questionImage: {
      type: String,
      required: false,
    },
    //options available? - will have only true or false value, if false we will have text else radio button
    hasOptions: {
      type: Boolean,
      required: [true, "Please provide the options"],
    },
    //if has_options is true, we will take 4/or more(based on requirement) options from admin user
    //expected UI - a text bar with a single radio button next to it, if selected pass true with the option in an object
    //sample input from FE {value: "", option: true}, user will only select true for correct option
    availableOptions: {
      type: Array,
      required: false,
    },
    //correct option - will strore the correct answer as text(if user has option we will recieve the correct answer as value(string))
    correctTextAnswer: {
      type: String,
      required: false,
    },
    //Subquestion - only used for set based question
    subQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "question",
        required: false,
      },
    ],
    solution: {
      type: String,
      required: false,
    },
    solutionImage: {
      type: String,
      required: false,
    },
    topic: {
      type: String,
      required: [true, "Please provide the topic"],
    },
    subTopic: {
      type: String,
      required: [true, "Please provide the sub-topic"],
    },
    difficultyLevel: {
      type: String,
      required: [true, "Please provide the difficulty level"],
    },
    //sample input from FE {type:"correct", score:"3"}, user will only select true for correct option
    markingScheme: {
      type: Array,
      required: [true, "Please provide the marking scheme"],
    },
    status: {
      type: Boolean,
      required: [true, "Please provide the status"],
    },
  },
  {
    timestamps: true,
  }
);

const questionModel = mongoose.model(
  "question",
  questionSchema
);

module.exports = questionModel;
