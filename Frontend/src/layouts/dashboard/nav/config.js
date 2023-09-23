// component
import SvgColor from "../../../components/svg-color";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  {
    title: "user",
    path: "/dashboard/user",
    icon: icon("ic_user"),
  },
  {
    title: "Questions",
    path: "/dashboard/questions",
    icon: icon("ic_blog"),
  },
  {
    title: "Sections",
    path: "/dashboard/sections",
    icon: icon("ic_blog"),
  },
  {
    title: "Test Formations",
    path: "/dashboard/testFormations",
    icon: icon("ic_blog"),
  },
  {
    title: "Enrollment",
    path: "/dashboard/enrollment",
    icon: icon("ic_blog"),
  },
];

const examinerConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  {
    title: "Questions",
    path: "/dashboard/questions",
    icon: icon("ic_blog"),
  },
  {
    title: "Sections",
    path: "/dashboard/sections",
    icon: icon("ic_blog"),
  },
  {
    title: "Test Formations",
    path: "/dashboard/testFormations",
    icon: icon("ic_blog"),
  },
  {
    title: "Enrollment",
    path: "/dashboard/enrollment",
    icon: icon("ic_blog"),
  },
];

const studentConfig = [
  {
    title: "dashboard",
    path: "/dashboard/app",
    icon: icon("ic_analytics"),
  },
  // {
  //   title: "Quiz",
  //   path: "/dashboard/quiz",
  //   icon: icon("ic_blog"),
  // },
  {
    title: "Student Enrollments",
    path: "/dashboard/studentEnrollment",
    icon: icon("ic_blog"),
  },

];

export { navConfig, studentConfig, examinerConfig };
