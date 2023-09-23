import React, { useState, useEffect } from "react";
import { AppBar, Dialog, IconButton, Toolbar } from "@mui/material";
import axios from "axios";
import { URL } from "../../../connection";
import StudentQuestions from "./StudentQuestionView/StudentQuestions";
import Instruction from "./Instruction/Instruction";

const Quiz = (props) => {
  const [next, setNext] = useState(0);
  console.log(props, props.quiz.instructions);

  const handleNext = () => {
    setNext(next + 1);
  };

  const handlePrevious = () => {
    if (next < 1) {
      setNext(0);
    } else {
      setNext(next - 1);
    }
  };

  console.log(next);
  return (
    <Dialog open={props.open} fullScreen>
      {next === 0 && (
        <Instruction
          instruction={props.quiz.instructions}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          next={next}
        />
      )}
      {next === 1 && (
        <StudentQuestions
          setOpen={props.setOpen}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          next={next}
        />
      )}
    </Dialog>
  );
};

export default Quiz;
