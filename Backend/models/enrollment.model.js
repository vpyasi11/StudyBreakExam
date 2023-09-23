const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// userID/ mail id : required
// testID : required
// marksObtained [section based marks] : not required
// EnrollmentTime : required
// ExaminationTime
// studentAttemptTime: required
// Attempted(boolean)) - status : not attempted, seen, attempted
// testJSON
// totalMarks- default - 0
// Responses[array] - []

const EnrollementSchema = new Schema({
  userID: {
    type: String,
    required: [true, "all fields are required"],
  },
  testID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "testformation",

    required: [true, "all fields are required"],
  },
  marksObtained: {
    type: Number,
    default: 0,
  },
  enrollmentTime: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  examinationStartTime: {
    type: String,
  },
  examinationEndTime: {
    type: String,
  },
  attempted: {
    type: String,
    enum: ["attempted", "not-attempted", "seen"],
    default: "not-attempted",
  },
  totalMarks: {
    type: Number,
    default: 0,
  },
  responses: {
    type: Array,
    default: [],
  },
});

const enrollmentModel = new mongoose.model("enrollment", EnrollementSchema);

module.exports = enrollmentModel;
