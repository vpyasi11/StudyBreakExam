import React, { useState } from "react";
import { AppBar, Dialog, IconButton, Toolbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Question from "../que";
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@mui/material";

export default function StudentQuestions(props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestion] = useState([
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is closest to the Sun?",
      options: ["Mars", "Venus", "Mercury", "Earth"],
      answer: "Mercury",
    },
    {
      question: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Lion"],
      answer: "Blue Whale",
    },
  ]);

  const handleAnswerSelected = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  const handleCloseQuiz = () => {
    props.setOpen(false);
  };
  return (
    <>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleCloseQuiz}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {showScore ? (
        <div className="score">
          <h3>Your Score: {score}</h3>
          <button onClick={restartQuiz}>Restart</button>
        </div>
      ) : (
        <Question
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          selected={handleAnswerSelected}
        />
      )}
      <Button onClick={props.handleNext}>Next</Button>
      <Button onClick={props.handlePrevious} disabled={props.next === 0}>
        Previous
      </Button>
    </>
  );
}
