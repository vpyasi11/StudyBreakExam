const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require("./routes/user.route");
require("dotenv").config();

// middleware

app.use(express.json());

app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const mongo_URL = "mongodb+srv://snehalmishra:123@capstonebatch8.hqed4b3.mongodb.net/studybreakexam";
const mongodb = process.env.MONGO_URL || mongo_URL;

const configDb = async () => {
  try {
    await mongoose.connect(mongodb);
    console.log("Database Connected");
  } catch (error) {
    console.log("An Error occured!", error);
    process.exit(1);
  }
};

configDb();

app.use("/test", require("./routes/testFormation.router"));
//app.use("/", require("./routes/question.router"));
app.use("/auth/v1/", userRoutes);
app.use("/eassyQ", require("./routes/eassy.router"));
app.use("/question", require("./routes/question.router"));
app.use("/section", require("./routes/section.router"));
app.use("/enrollment", require("./routes/enrollment.router"));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
