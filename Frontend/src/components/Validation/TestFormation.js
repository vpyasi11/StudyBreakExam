import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  testName: Yup.string().required("Test name is required"),
  instructions: Yup.string().required("Instructions are required"),
  numberOfSections: Yup.number()
    .integer()
    .min(0),
  sectionData: Yup.array().of(
    Yup.object().shape({
      sectionName: Yup.string().required("Section name is required"),
      sectionDuration: Yup.number()
        .integer()
        .min(0)
        .required("Section duration is required"),
    })
  ),
  totalDuration: Yup.number()
    .integer()
    .min(0)
    .required("Total duration is required"),
  hasSectionDivision: Yup.boolean(),
  hasEndTest: Yup.boolean(),
  hasTestCutOff: Yup.boolean(),
  // testCutOff: Yup.object().shape({
  //   gen: Yup.number()
  //     .integer()
  //     .min(0)
  //     .required("General category cutoff is required"),
  //   obc: Yup.number()
  //     .integer()
  //     .min(0)
  //     .required("OBC category cutoff is required"),
  //   sc: Yup.number()
  //     .integer()
  //     .min(0)
  //     .required("SC category cutoff is required"),
  //   st: Yup.number()
  //     .integer()
  //     .min(0)
  //     .required("ST category cutoff is required"),
  // }),
  hasOnlineCalculator: Yup.boolean(),
  status: Yup.boolean(),
});

export default validationSchema;
