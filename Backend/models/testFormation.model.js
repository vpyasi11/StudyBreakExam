const mongoose = require("mongoose");
const testFormationSchema = new mongoose.Schema(
  {
    testName: {
      type: String,
      require: [true, "Please provide a section name"],
    },
    instructions: {
      type: String,
      require: [true, "Please provide a section type"],
    },
    numberOfSections: {
      type: Number,
      required: [true, "Please provide number of questions"],
    },
    sectionData: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sections",
      },
    ],
    totalDuration: {
      type: Number,      
      required: [true, "Please provide section duration"],
    },
    hasSectionDivision: {
      type: Boolean,
      required: [true, "Please provide the section division options"],
    },
    hasEndTest: {
      type: Boolean,
      required: [true, "Please provide the end test options"],
    },
    hasTestCutOff: {
      type: Boolean,
      required: [true, "Please provide the test cut off options"],
    },
    testCutOff: [
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
    hasOnlineCalculator: {
      type: Boolean,
      required: [true, "Please provide the online calculator options"],
    },
    status: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

const testFormationModel = mongoose.model("testFormation", testFormationSchema);
module.exports = testFormationModel;

