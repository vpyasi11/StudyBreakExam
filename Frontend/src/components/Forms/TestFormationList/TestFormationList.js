import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import TestFormationEdit from "../TestFormationEdit/TestFormationEdit";

const TestFormationList = ({ testFormations, onDelete, onUpdate }) => {
  const [open, setOpen] = useState("");
  const handleOpen = (row, index) => {
    setOpen(true);
  };
  const handleDeleteClick = (index) => {
    onDelete(index);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sl No.</TableCell>
            <TableCell>Test Name</TableCell>
            <TableCell>Section Division Required?</TableCell>
            <TableCell># of Sections</TableCell>
            <TableCell>Test Duration</TableCell>
            <TableCell>View/Edit Test Formation</TableCell>
            <TableCell>Delete Test Formation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {testFormations.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.testName}</TableCell>
              <TableCell>{row.hasSectionDivision}</TableCell>
              <TableCell>{row.numberOfSections}</TableCell>
              <TableCell>{row.totalDuration}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  color="success"
                  onClick={() => {
                    handleOpen(row, index);
                  }}
                >
                  View/Edit Test Formation
                </Button>
                {open && (
                  <TestFormationEdit
                    testFormation={row}
                    index={index}
                    onUpdate={onUpdate}
                    open={open}
                    setOpen={setOpen}
                  />
                )}
              </TableCell>
              <TableCell>
                <IconButton
                  color="error"
                  aria-label="delete"
                  onClick={() => handleDeleteClick(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TestFormationList;
