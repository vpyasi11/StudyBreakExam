import React, { useState } from "react";
import QuestionShow from "../QuestionShow/QuestionShow";
import Button from "@mui/material/Button";
import "./Question.css";
import QuestionAdd from "../AddQuestions/QuestionAdd";
import refreshLogo from "../../../utils/Images/refresh-button.png";
import { ToastContainer, toast } from "react-toastify";

const Questions = (props, { ques }) => {
  const [open, setOpen] = useState(false);
  const [editQuestion, setEditQuestion] = useState([]);
  const [refreshData, setRefreshData] = useState(true);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleQuestionAdd = (question) => {
    if (!props.questionData.questions) {
      props.setQues([...props.ques, question]);
    } else {
      props.questionData.questions.push(question);
      ques = props.questionData.questions;
    }
  };

  const handleRefreshQuesDetails = () => {
    setRefreshData(false);
    toast.success("Questions data refresh successful!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
    setTimeout(() => {
      setRefreshData(true);
    }, 100);
  };

  return (
    <div className="question_container">
      <div className="question_title">
        <h3>Question details</h3>
        <Button
          sx={{ml: "600px"}}
          onClick={() => {
            handleRefreshQuesDetails();
          }}
        >
          <img src={refreshLogo} alt="Refresh" width={30}></img>
        </Button>
        <Button variant="contained" onClick={handleOpen} color="primary">
          Add Question
        </Button>
      </div>
      <QuestionAdd
        handleQuestionAdd={handleQuestionAdd}
        fromTestFormation={true}
        setOpenDialog={setOpen}
        openDialog={open}
        editQuestion={editQuestion}
        setEditQuestion={setEditQuestion}
        fromDashboard={false}
      />
      {refreshData && (
        <QuestionShow
          ques={props.ques}
          handleQuestionAdd={handleQuestionAdd}
          questionData={props.questionData.questions}
        />
      )}

      <ToastContainer />
    </div>
  );
};

export default Questions;
