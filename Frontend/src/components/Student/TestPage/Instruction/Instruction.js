import React from "react";
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

export default function Instruction(props) {
  return (
    <>
      <div>{props.instruction}</div>
      <Button onClick={props.handleNext}>Next</Button>
      <Button onClick={props.handlePrevious} disabled={props.next === 0}>
        Previous
      </Button>
    </>
  );
}
