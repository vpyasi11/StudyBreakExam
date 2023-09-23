const mongoose = require("mongoose");
const sectionSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      require: [true, "Please provide a section name"],
    },
    sectionType: {
      type: String,
      require: [true, "Please provide a section type"],
    },
    numberOfQuestions: {
      type: Number,
      required: [true, "Please provide number of questions"],
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "questions",
      },
    ],
    sectionDuration: {
      type: Number,
      required: [true, "Please provide section duration"],
    },
    sectionCutOff: [
      {
        gen: {
          type: Number,
          required: [true, "Please provide General category score"],
        },
        obc: {
          type: Number,
          required: [true, "Please provide OBC category score"],
        },
        sc: {
          type: Number,
          required: [true, "Please provide SC category score"],
        },
        st: {
          type: Number,
          required: [true, "Please provide ST category score"],
        },
      },
    ],
    calculatorRequired: {
      type: Boolean,
      default: false,
    },
    sectionEndProvision: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      required: [true, "Please provide the status"],
    },
  },
  { timestamps: true }
);

const sectionModel = mongoose.model("section", sectionSchema);
module.exports = sectionModel;
