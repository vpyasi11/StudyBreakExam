import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { filter } from "lodash";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
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
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import {
  SectionListHead,
  SectionListToolbar,
} from "../sections/@dashboard/section";
import SectionCreate from "../components/Forms/SectionCreate/SectionCreate";

//connection file
import { URL } from "../connection";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TABLE_HEAD = [
  { id: "name", label: "Section Name", alignRight: false },
  { id: "type", label: "Type", alignRight: false },
  { id: "numberOfQuestions", label: "# of Questions", alignRight: false },
  { id: "duration", label: "Duration (mins)", alignRight: false },
  {
    id: "sectionEndProvision",
    label: "Section End Provision?",
    alignRight: false,
  },
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
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_id) => _id.sectionName.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function SectionsPage(onUpdate) {
  const [sectionsList, setSectionsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);
  const [editSection, setEditSection] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        await axios
          .get(`${URL}/section/getallsections`)
          .then((data) => {
            // console.log(data.data);
            setSectionsList(data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (err) {}
      setIsLoading(false);
    };
    getData();
  }, [openDialog]);

  const handleStatusSwitch = (sectionID, checkedStatus) => {
    // console.log(sectionID, checkedStatus);
    let sectionStatus = checkedStatus ? false : true;
    axios
      .post(`${URL}/section/updatesectionstatus`, {
        id: sectionID,
        status: sectionStatus,
      })
      .then((response) => {
        if (response.data.message.includes("Status updated successfully")) {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          toast.success("Section update successful!", {
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
        console.error("Error updating test formation status:", error);
      });
    return;
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleOpenEditSection = (row) => {
    setEditSection([row]);
    setOpenDialog(true);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = sectionsList.map((n) => n.name);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - sectionsList.length) : 0;

  const filteredUsers = applySortFilter(
    sectionsList,
    getComparator(order, orderBy),
    filterName
  );

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Sections </title>
      </Helmet>

      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Section Details
          </Typography>
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleClickOpen}
          >
            Add Section
          </Button>
          <Dialog open={openDialog} onClose={handleClose} maxWidth="xl">
            <DialogTitle>Section</DialogTitle>
            <DialogContent>
              <SectionCreate
                onSubmit={null}
                open={openDialog}
                setOpen={setOpenDialog}
                fromTestFormation={false}
                editSection={editSection}
                setEditSection={setEditSection}
                fromDashboard={true}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleClose}>Save Section</Button>
            </DialogActions>
          </Dialog>
        </Stack>

        <Card>
          <SectionListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <SectionListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={sectionsList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {!isLoading &&
                    filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row, index) => {
                        const {
                          _id,
                          sectionName,
                          sectionType,
                          numberOfQuestions,
                          sectionDuration,
                          sectionEndProvision,
                          status,
                        } = row;
                        const selectedSection = selected.indexOf(index) !== -1;

                        return (
                          <TableRow
                            hover
                            key={_id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={selectedSection}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={selectedSection}
                                onChange={(event) => handleClick(event, index)}
                              />
                            </TableCell>

                            <TableCell align="left" width={300}>
                              {sectionName}
                            </TableCell>

                            <TableCell align="left" width={120}>
                              {sectionType === "singleBased"
                                ? "Single based"
                                : sectionType === "setBased"
                                ? "Set based"
                                : "Essay based"}
                            </TableCell>
                            <TableCell align="center">
                              {numberOfQuestions}
                            </TableCell>
                            <TableCell align="center">
                              {sectionDuration}
                            </TableCell>
                            <TableCell align="center">
                              {sectionEndProvision ? "Yes" : "No"}
                            </TableCell>

                            <TableCell align="left">
                              <Switch
                                color="success"
                                checked={status}
                                onChange={() => handleStatusSwitch(_id, status)}
                              />
                            </TableCell>
                            <TableCell>
                              <Button
                                onClick={() => {
                                  handleOpenEditSection(row);
                                }}
                              >
                                <Iconify
                                  icon={"eva:edit-fill"}
                                  sx={{ mr: 2 }}
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
            count={sectionsList.length}
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
