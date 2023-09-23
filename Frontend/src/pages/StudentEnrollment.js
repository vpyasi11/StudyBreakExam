import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { filter } from "lodash";
import axios from "axios";
import { useCookies } from "react-cookie";
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
  TableContainer,
  TablePagination,
} from "@mui/material";
// components
import Scrollbar from "../components/scrollbar";
// sections

import {
  StudentEnrollmentListHead,
  StudentEnrollmentListToolbar,
} from "../sections/@dashboard/studentEnrollment";

//connection file
import { URL } from "../connection";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Quiz from "../components/Student/TestPage/Quiz";

const TABLE_HEAD = [
  { id: "testID", label: "Test ID", alignRight: false },
  { id: "enrollmentTime", label: "Enrollment Date", alignRight: false },
  { id: "examinationStartTime", label: "Start Date", alignRight: false },
  { id: "examinationEndTime", label: "End Date", alignRight: false },
  { id: "marksObtained", label: "Marks Obtained", alignRight: false },
  { id: "attempted", label: "Status", alignRight: false },
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
  const stabilizedThis = Array.isArray(array)
    ? array.map((el, index) => [el, index])
    : [];
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_id) => _id.testName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function StudentEnrollment(onUpdate) {
  const [studentEnrollmentsList, setStudentEnrollmentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cookies, setCookie, removeCookie] = useCookies("jwt");
  // const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [quiz, setQuiz] = useState([]);
  const userEmailID = sessionStorage.getItem("email");

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        await axios
          .post(`${URL}/enrollment/userenrollments`, {
            headers: {
              Authorization: "Bearer " + cookies.jwt,
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            userID: userEmailID,
          })
          .then((response) => {
            //console.log(response.data.data);
            setStudentEnrollmentsList(response.data.data);
          });
      } catch (err) {}

      setIsLoading(false);
    };
    getData();
  }, [openDialog]);

  // const handleOpenEditTest = (row) => {

  // };

  const handleClickOpen = async (row) => {
    console.log(row._id, row.userID);
    try {
      await axios
        .post(`${URL}/enrollment/teststart`, {
          testID: row.testID,
          userID: row.userID,
        })
        .then((response) => {
          console.log(response.data);
          setQuiz(response.data.testData);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (err) {}
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
      const newSelecteds = studentEnrollmentsList.map((n) => n.name);
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
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - studentEnrollmentsList.length)
      : 0;

  const filteredTests = applySortFilter(
    studentEnrollmentsList,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredTests.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Student Enrollments </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Student Enrollment Details
          </Typography>
        </Stack>

        <Card>
          <StudentEnrollmentListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 1100 }}>
              <Table>
                <StudentEnrollmentListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={studentEnrollmentsList.length}
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
                          testID,
                          enrollmentTime,
                          examinationStartTime,
                          examinationEndTime,
                          attempted,
                          marksObtained,
                        } = row;
                        const selectedStudentEnrolment =
                          selected.indexOf(index) !== -1;

                        return (
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={selectedStudentEnrolment}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedStudentEnrolment}
                                onChange={(event) => handleClick(event, index)}
                              />
                            </TableCell>

                            <TableCell align="left" width={240}>
                              {testID}
                            </TableCell>
                            <TableCell align="left">{enrollmentTime}</TableCell>
                            <TableCell align="left">
                              {examinationStartTime}
                            </TableCell>
                            <TableCell align="left">
                              {examinationEndTime}
                            </TableCell>
                            <TableCell align="center">
                              {marksObtained}
                            </TableCell>
                            <TableCell align="center">
                              {attempted === "not-attempted"
                                ? "Not Attempted"
                                : "Attempted"}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                sx={{ borderRadius: 20 }}
                                onClick={() => {
                                  handleClickOpen(row);
                                }}
                              >
                                <Typography sx={{ fontSize: 12 }}>
                                  Start
                                </Typography>
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
          {openDialog && (
            <Quiz quiz={quiz} open={openDialog} setOpen={setOpenDialog} />
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={studentEnrollmentsList.length}
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
