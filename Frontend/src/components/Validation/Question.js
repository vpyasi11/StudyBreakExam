import * as Yup from "yup";

const QuestionValidationSchema = Yup.object().shape({
  type: Yup.string().required("Type is required"),
  question: Yup.string().required("Question is required"),
  questionImage: Yup.string(),
  hasOption: Yup.boolean(),
  availableOptions: Yup.array().of(
    Yup.object().shape({
      key: Yup.string(),
      value: Yup.string(),
    })
  ),
  correctTextAnswer: Yup.string().required("Correct answer is required"),
  solution: Yup.string().required("Solution is required"),
  solutionImage: Yup.string(),
  topic: Yup.string().required("Topics is required"),
  subTopic: Yup.string().required("Subtopic is required"),
  difficultyLevel: Yup.string(),
  markingScheme: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().oneOf(["correct", "incorrect", "noresponse"]),
      score: Yup.number().required("Score is required"),
    })
  ),
});

export default QuestionValidationSchema;
