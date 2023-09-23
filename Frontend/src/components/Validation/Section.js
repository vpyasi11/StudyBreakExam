import * as Yup from "yup";

const sectionValidationSchema = Yup.object().shape({
  sectionName: Yup.string().required("Section name is required"),
  sectionType: Yup.string().required("Section type is required"),
  numberOfQuestions: Yup.number()
    .integer()
    .min(0)
    .required("Number of questions is required"),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required("Question is required"),
    })
  ),
  sectionDuration: Yup.number()
    .integer()
    .min(0)
    .required("Section duration is required"),
  // sectionCutOff: Yup.array().of(
  //   Yup.object().shape({
  //     gen: Yup.number()
  //       .integer()
  //       .min(0)
  //       .required("General category cutoff is required"),
  //     obc: Yup.number()
  //       .integer()
  //       .min(0)
  //       .required("OBC category cutoff is required"),
  //     sc: Yup.number()
  //       .integer()
  //       .min(0)
  //       .required("SC category cutoff is required"),
  //     st: Yup.number()
  //       .integer()
  //       .min(0)
  //       .required("ST category cutoff is required"),
  //   })
  // ),
  sectionCutOff: Yup.object().shape({
    gen: Yup.number()
      .integer()
      .min(0)
      .required("General category cutoff is required"),
    obc: Yup.number()
      .integer()
      .min(0)
      .required("OBC category cutoff is required"),
    sc: Yup.number()
      .integer()
      .min(0)
      .required("SC category cutoff is required"),
    st: Yup.number()
      .integer()
      .min(0)
      .required("ST category cutoff is required"),
  }),
  calculatorRequired: Yup.boolean(),
  sectionEndProvision: Yup.boolean(),
  status: Yup.boolean(),
});

export default sectionValidationSchema;
