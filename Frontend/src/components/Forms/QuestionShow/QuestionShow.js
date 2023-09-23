import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Iconify from "../../iconify/Iconify";
import QuestionAdd from "../AddQuestions/QuestionAdd";

const QuestionShow = (props) => {
  const [open, setOpen] = useState(false);
  const [editQuestion, setEditQuestion] = useState([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenEditQuestion = (row) => {
    setEditQuestion([row]);
    setOpen(true);
  };

  return (
    <TableContainer component={Paper}>
      {/* {console.log(rows)} */}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sl No.</TableCell>
            <TableCell width={300}>Question</TableCell>
            <TableCell width={180}>Question Type</TableCell>
            <TableCell align="center"># of Subquestions</TableCell>
            <TableCell align="center">Difficulty Level</TableCell>
            <TableCell align="center">View/ Edit Question</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.questionData
            ? props.questionData.map((row, index) => {
                const { id, question, type, difficultyLevel, subQuestions } =
                  row;
                return (
                  <TableRow
                    hover key={id ? id : index} tabIndex={-1}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{question}</TableCell>
                    <TableCell>
                      {type === "singleBased"
                        ? "Single Based"
                        : type === "setBased"
                        ? "Set Based"
                        : "Essay Based"}
                    </TableCell>
                    <TableCell align="center">
                      {Math.max(1, subQuestions.length)}
                    </TableCell>
                    <TableCell>
                      {difficultyLevel === "easy"
                        ? "Easy"
                        : row.difficultyLevel === "medium"
                        ? "Medium"
                        : "Hard"}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          handleOpenEditQuestion(row);
                        }}
                      >
                        <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
                      </Button>
                      {open && (
                        <QuestionAdd
                          handleQuestionAdd={props.handleQuestionAdd}
                          handleClose={handleClose}
                          fromTestFormation={true}
                          setOpenDialog={setOpen}
                          openDialog={open}
                          editQuestion={editQuestion}
                          setEditQuestion={setEditQuestion}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            : props.ques.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.question}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell align="center">
                    {Math.max(1, row.subQuestions.length)}
                  </TableCell>
                  <TableCell>
                    {row.difficultyLevel === "easy"
                      ? "Easy"
                      : row.difficultyLevel === "medium"
                      ? "Medium"
                      : "Hard"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        handleOpenEditQuestion(row);
                      }}
                    >
                      <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
                    </Button>
                    {open && (
                      <QuestionAdd
                        handleQuestionAdd={props.handleQuestionAdd}
                        handleClose={handleClose}
                        fromTestFormation={true}
                        setOpenDialog={setOpen}
                        openDialog={open}
                        editQuestion={editQuestion}
                        setEditQuestion={setEditQuestion}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default QuestionShow;
