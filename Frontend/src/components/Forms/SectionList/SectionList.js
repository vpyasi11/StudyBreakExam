import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Iconify from "../../iconify/Iconify";
import SectionCreate from "../SectionCreate/SectionCreate";

const SectionList = (props) => {
  const [open, setOpen] = useState(false);
  const [editSection, setEditSection] = useState([]);

  // const handleOpen = (row, index) => {
  //   setOpen(true);
  // };
  // const handleDeleteClick = (index) => {
  //   props.onDelete(index);
  // };
  const handleOpenEditSection = (row) => {
    setEditSection([row]);
    setOpen(true);
  };

  // console.log("section list data", props.sections);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 1200 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sl No.</TableCell>
            <TableCell width={390}>Section Name</TableCell>
            <TableCell width={180}>Section Type</TableCell>
            <TableCell align="center"># of Questions</TableCell>
            <TableCell align="center">Duration (mins)</TableCell>
            <TableCell align="center">View/Edit Section</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.sections.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell width={300}>{row.sectionName}</TableCell>
              <TableCell>
                {row.sectionType === "singleBased"
                  ? "Single based"
                  : row.sectionType === "setBased"
                  ? "Set based"
                  : "Essay based"}
              </TableCell>
              <TableCell align="center">{row.numberOfQuestions}</TableCell>
              <TableCell align="center">{row.sectionDuration}</TableCell>
              <TableCell align="center">
                <Button
                  onClick={() => {
                    handleOpenEditSection(row);
                  }}
                >
                  <Iconify icon={"eva:edit-fill"} sx={{ mr: 2 }} />
                </Button>
                {open && (
                  <SectionCreate
                    onSubmit={null}
                    open={open}
                    setOpen={setOpen}
                    fromTestFormation={false}
                    editSection={editSection}
                    setEditSection={setEditSection}
                    fromDashboard={false}
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

export default SectionList;
