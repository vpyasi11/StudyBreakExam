import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import {
  Stack,
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Alert,
  Collapse,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "./TestFormations.css";
import SectionCreate from "../SectionCreate/SectionCreate";
import SectionList from "../SectionList/SectionList";
import CloseIcon from "@mui/icons-material/Close";
import validationSchema from "../../Validation/TestFormation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import refreshLogo from "../../../utils/Images/refresh-button.png"

//connection file
import { URL } from "../../../connection";

const TestFormations = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies("jwt");
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [testsCutOff, setTestsCutOff] = useState({
    gen: 0,
    obc: 0,
    sc: 0,
    st: 0,
  });
  const [editSection, setEditSection] = useState([]);
  const [refreshData, setRefreshData] = useState(true);
  
  // const handleCreateSection = (formSectionData) => {
  //   formData.sectionData.push(formSectionData);
  // };

  // const handleEditSection = (modifiedSection, id) => {
  //   const updatedsections = sections.map((ele, index) => {
  //     if (index === id) {
  //       return modifiedSection;
  //     } else {
  //       return ele;
  //     }
  //   });
  //   setSections(updatedsections);
  // };

  // const handleDeleteSection = (id) => {
  //   const updated = sections.filter((section, index) => {
  //     return index !== id;
  //   });
  //   setSections(updated);
  // };

  const handleCloseTest = () => {
    props.setOpenDialog(false);
    props.setEditTestFormation([]);
  };

  const handleRefreshSecDetails = () => {
    setRefreshData(false);
    toast.success("Sections data refresh successful!", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000,
    });
    setTimeout(() => {setRefreshData(true)}, 100)
  };

  const [err, setErr] = useState("");
  const [formData, setFormData] = useState({
    testName: "",
    instructions: "",
    numberOfSections: 0,
    sectionData: [],
    totalDuration: 0,
    hasSectionDivision: true,
    hasEndTest: false,
    hasTestCutOff: false,
    testCutOff: {
      gen: 0,
      obc: 0,
      sc: 0,
      st: 0,
    },
    hasOnlineCalculator: false,
    status: true,
    ...props.editTestFormation[0],
  });

  const handleTestSectionEdit = () => {
    setOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeRadio = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeTestCutoff = (e) => {
    const { name, value } = e.target;
    setTestsCutOff({
      ...testsCutOff,
      [name]: value,
    });
    setFormData({
      ...formData,
      testCutOff: testsCutOff,
    });
  };

  // console.log(formData);

  const handleSubmitTest = async (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
    });
    const isValid = await validationSchema.isValid(formData);
    if (!isValid) {
      setOpenAlert(true);
    }

    validationSchema
      .validate(formData)
      .then(async (data) => {
        try {
          const formDataToSend = JSON.stringify(formData);
          // console.log(formDataToSend);
          // varToken value to be taken from cookie stored after login
          if (props.editTestFormation.length > 0) {
            await axios
              .post(
                `${URL}/test/updatetestformation`,
                formDataToSend,
                {
                  headers: {
                    Authorization: "Bearer " + cookies.jwt,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                }
              )
              .then((response) => {
                handleCloseTest();
                alert("Test Formation updated successfully");
              });
          } else {
            await axios
              .post(`${URL}/test/addtestformations`, formDataToSend, {
                headers: {
                  Authorization: "Bearer " + cookies.jwt,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              })
              .then(() => {
                handleCloseTest();
                alert("Test Formation saved successfully");
              });
          }
        } catch (error) {
          console.error("Error saving Test Formation:", error);
        }
      })
      .catch(({ errors }) => setErr(errors[0]));

    setTimeout(() => {
      setOpenAlert(false);
    }, 5000);
  };

  return (
    <>
      <Dialog open={props.openDialog} onClose={handleCloseTest} maxWidth="xl">
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseTest}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Collapse in={openAlert}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpenAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{
              mb: 2,
              maxWidth: "360px",
              fontSize: "16px",
              margin: "0 auto",
            }}
          >
            {err}
          </Alert>
        </Collapse>
        <DialogTitle>
          <Typography variant="h4">Test Formations Form</Typography>
        </DialogTitle>
        <DialogContent>
          <div className="testFormation">
            <Box
              sx={{
                p: "15px 15px",
              }}
              onSubmit={handleSubmitTest}
            >
              <Stack>
                <Box>
                  <TextField
                    required
                    label="Test Name"
                    variant="outlined"
                    name="testName"
                    value={formData.testName}
                    onChange={handleChange}
                    sx={{ width: "540px" }}
                  />
                </Box>
              </Stack>
              <Stack
                component="form"
                sx={{
                  "& .MuiTextField-root": { mt: 3, width: "84ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  required
                  label="Instructions"
                  variant="outlined"
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleChange}
                  multiline
                  maxRows={10}
                  minRows={6}
                />
              </Stack>
              <Stack mt={4}>
                <FormControl>
                  <FormLabel required id="demo-row-radio-buttons-group-label">
                    Section Division Required?
                  </FormLabel>
                  <Box display="flex" gap={4}>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="hasSectionDivision"
                      value={formData.hasSectionDivision}
                      onChange={handleChangeRadio}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>

                    {formData.hasSectionDivision ? (
                      <>
                        <TextField
                          required
                          disabled
                          label="# of Sections"
                          variant="outlined"
                          name="numberOfSections"
                          value={formData.numberOfSections}
                          onChange={handleChange}
                          sx={{
                            width: "120px",
                            marginLeft: "72px",
                            marginBottom: "20px",
                          }}
                        />
                        <Box sx={{ml: "450px", mt: "6px"}}>
                          <Button
                            onClick={() => {
                              handleRefreshSecDetails();
                            }}
                          >
                            <img src={refreshLogo} alt="Refresh" width={30}></img>
                          </Button>
                        </Box>
                        
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            width: "130px",
                            height: "42px",
                            marginLeft: "50px",
                            marginTop: "6px",
                          }}
                          onClick={handleTestSectionEdit}
                        >
                          Add Sections
                        </Button>
                        <SectionCreate
                          handleCreateSection={formData}
                          open={open}
                          setOpen={setOpen}
                          fromTestFormation={true}
                          editSection={editSection}
                          setEditSection={setEditSection}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </Box>
                </FormControl>
              </Stack>

              {formData.hasSectionDivision && refreshData && (                
                <Box>
                  <SectionList
                    sections={formData.sectionData}
                    editTestFormationSections={
                      props.editTestFormation[0]?.sectionData
                    }
                  />
                </Box>
              )}
              {/* : (
                 ""
               )} */}

              <Stack mt={6}>
                <Box>
                  <FormControl>
                    <FormLabel required id="demo-row-radio-buttons-group-label">
                      End Test?
                    </FormLabel>
                    <Box display="flex">
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="hasEndTest"
                        value={formData.hasEndTest}
                        onChange={handleChangeRadio}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </Box>
                  </FormControl>
                  <FormControl sx={{ ml: "90px" }}>
                    <FormLabel required id="demo-row-radio-buttons-group-label">
                      Online Calculator Required?
                    </FormLabel>
                    <Box display="flex">
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="hasOnlineCalculator"
                        value={formData.hasOnlineCalculator}
                        onChange={handleChangeRadio}
                      >
                        <FormControlLabel
                          value={true}
                          control={<Radio />}
                          label="Yes"
                        />
                        <FormControlLabel
                          value={false}
                          control={<Radio />}
                          label="No"
                        />
                      </RadioGroup>
                    </Box>
                  </FormControl>
                </Box>
              </Stack>
              <Stack mt={2}>
                <FormControl sx={{ mt: "20px" }}>
                  <FormLabel required id="demo-row-radio-buttons-group-label">
                    Test Cut-off Required?
                  </FormLabel>
                  <Box display="flex">
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="hasTestCutOff"
                      value={formData.hasTestCutOff}
                      onChange={handleChangeRadio}
                    >
                      <FormControlLabel
                        value={true}
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value={false}
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>

                    {formData.hasTestCutOff ? (
                      <FormControl>
                        <Box display="flex">
                          <TextField
                            label="General"
                            variant="outlined"
                            name="gen"
                            value={testsCutOff.gen}
                            onChange={handleChangeTestCutoff}
                            sx={{
                              width: "120px",
                              marginLeft: "72px",
                              marginBottom: "20px",
                            }}
                          />
                          <TextField
                            label="OBC"
                            variant="outlined"
                            name="obc"
                            value={testsCutOff.obc}
                            onChange={handleChangeTestCutoff}
                            sx={{
                              width: "120px",
                              marginLeft: "72px",
                              marginBottom: "20px",
                            }}
                          />
                          <TextField
                            label="SC"
                            variant="outlined"
                            name="sc"
                            value={testsCutOff.sc}
                            onChange={handleChangeTestCutoff}
                            sx={{
                              width: "120px",
                              marginLeft: "72px",
                              marginBottom: "20px",
                            }}
                          />
                          <TextField
                            label="ST"
                            variant="outlined"
                            name="st"
                            value={testsCutOff.st}
                            onChange={handleChangeTestCutoff}
                            sx={{
                              width: "120px",
                              marginLeft: "72px",
                              marginBottom: "20px",
                            }}
                          />
                        </Box>
                      </FormControl>
                    ) : (
                      ""
                    )}
                  </Box>
                </FormControl>
              </Stack>
            </Box>
          </div>
        </DialogContent>
        <DialogActions sx={{ margin: "30px 60px", marginLeft: "px" }}>
          <Button
            size="large"
            sx={{ border: "2px solid #e2e2e2" }}
            onClick={handleCloseTest}
          >
            Cancel
          </Button>
          <Button
            size="large"
            sx={{ border: "2px solid #e2e2e2" }}
            onClick={handleSubmitTest}
          >
            Save Test
          </Button>
        </DialogActions>
        <ToastContainer />
      </Dialog>      
    </>
  );
};

export default TestFormations;
