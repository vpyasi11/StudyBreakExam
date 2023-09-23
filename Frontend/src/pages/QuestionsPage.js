import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { filter } from "lodash";
import axios from "axios";
// @mui
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
  IconButton,
  TableContainer,
  TablePagination,
  Switch,
} from "@mui/material";
// components
import Scrollbar from "../components/scrollbar";
// sections
import {
  QuestionListHead,
  QuestionListToolbar,
} from "../sections/@dashboard/question";

import QuestionAdd from "../components/Forms/AddQuestions/QuestionAdd";
// import EditQuestions from "../components/Forms/EditQuestions/EditQuestions";
import Iconify from "../components/iconify/Iconify";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//connection file
import { URL } from "../connection";

const TABLE_HEAD = [
  { id: "question", label: "Question", alignRight: false },
  { id: "type", label: "Question Type", alignRight: false },
  { id: "hasOptions", label: "Has Options?", alignRight: false },
  { id: "difficultyLevel", label: "Difficulty Level", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  // console.log(array)
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_id) => _id.question.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function QuestionsPage(onUpdate) {
  const [questionsList, setQuestionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [editQuestion, setEditQuestion] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        await axios
          .get(`${URL}/question/getallquestions`)
          .then((response) => {
            // console.log(response.data.questions);
            setQuestionsList(response.data.questions);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {}

      setIsLoading(false);
    };
    getData();
  }, [openDialog]);

  const handleOpenQuesTest = (row) => {
    setEditQuestion([row]);
    setOpenDialog(true);
  };

  const handleStatusSwitch = (questionID, checkedStatus) => {
    let quesStatus = checkedStatus ? false : true;
    axios
      .post(`${URL}/question/updatequestionstatus`, {
        id: questionID,
        status: quesStatus,
      })
      .then((response) => {
        if (response.data.message.includes("Status updated successfully")) {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          toast.success("Question update successful!", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        } else {
          toast.error(response.data.msg, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating question status:", error);
      });
    return;
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  // const handleClose = () => {
  //   setOpenDialog(false);
  // };

  // const handleOpenMenu = (event) => {
  //   setOpen(event.target);
  // };

  // const handleCloseMenu = () => {
  //   setOpen(null);
  // };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = questionsList.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - questionsList.length) : 0;

  const filteredTests = applySortFilter(
    questionsList,
    getComparator(order, orderBy),
    filterName
  );
  const isNotFound = !filteredTests.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Question Details </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Question Details
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClickOpen}
          >
            Add Question
          </Button>
          {openDialog && (
            <QuestionAdd
              editQuestion={editQuestion}
              setOpenDialog={setOpenDialog}
              openDialog={openDialog}
              setEditQuestion={setEditQuestion}
              fromDashboard={true}
            />
          )}
        </Stack>

        <Card>
          <QuestionListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <QuestionListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={questionsList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {!isLoading &&
                    filteredTests
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const {
                          _id,
                          question,
                          type,
                          hasOptions,
                          difficultyLevel,
                          status,
                        } = row;
                        const selectedQuestion = selected.indexOf(index) !== -1;

                        return (
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={selectedQuestion}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedQuestion}
                                onChange={(event) => handleClick(event, index)}
                              />
                            </TableCell>
                            <TableCell align="left" width={300}>
                              {question}
                            </TableCell>
                            <TableCell align="left">
                              {type === "singleBased"
                                ? "Single based"
                                : type === "setBased"
                                ? "Set based"
                                : "Essay based"}
                            </TableCell>
                            <TableCell align="center">
                              {hasOptions ? "Yes" : "No"}
                            </TableCell>
                            <TableCell align="left">
                              {difficultyLevel === "easy"
                                ? "Easy"
                                : difficultyLevel === "medium"
                                ? "Medium"
                                : "Hard"}
                            </TableCell>
                            <TableCell align="left">
                              <Switch
                                color="success"
                                checked={status}
                                onChange={() => handleStatusSwitch(_id, status)}
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Button
                                disabled={!status}
                                onClick={() => {
                                  handleOpenQuesTest(row);
                                }}
                              >
                                <Iconify
                                  icon={"eva:edit-fill"}
                                  sx={{ m: "auto" }}
                                />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={questionsList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <ToastContainer />
    </>
  );
}
