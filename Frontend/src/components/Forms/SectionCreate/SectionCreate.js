import React, { useState } from "react";
import "./SectionCreate.css";
import Questions from "../Questions/Questions";
import { useCookies } from "react-cookie";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  TextField,
  Select,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  Radio,
  Typography,
  Collapse,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import validationSchema from "../../../components/Validation/Section";

//connection file
import { URL } from "../../../connection";

const SectionCreate = (props) => {
  //cookies
  const [cookies, setCookie, removeCookie] = useCookies("jwt");
  const [err, setErr] = useState("");
  const [cutoff, setCutOff] = useState({
    gen: 0,
    obc: 0,
    sc: 0,
    st: 0,
  });
  const [openAlert, setOpenAlert] = useState(false);
  const [refreshData, setRefreshData] = useState(true);

  const [formData, setFormData] = useState({
    sectionName: "",
    sectionType: "",
    numberOfQuestions: 0,
    questions: [],
    sectionDuration: 0,
    sectionCutOff: {
      gen: 0,
      obc: 0,
      sc: 0,
      st: 0,
    },
    calculatorRequired: false,
    sectionEndProvision: false,
    status: true,
    ...props.editSection[0],
  });

  const [ques, setQues] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChangeCutoff = (e) => {
    const { name, value } = e.target;
    setCutOff({
      ...cutoff,
      [name]: value,
    });
    setFormData({
      ...formData,
      sectionCutOff: cutoff,
    });
  };

  const handleSubmitSection = async (e) => {
    e.preventDefault();
    if (props.editSection[0] && props.editSection[0].questions.length > 0) {
      const totalQues = props.editSection[0].questions;
      formData.questions = totalQues;
    } else {
      formData.questions = ques;
    }

    // formData.questions = ques;

    const isValid = await validationSchema.isValid(formData);
    if (!isValid) {
      setOpenAlert(true);
    }

    validationSchema
      .validate(formData)
      .then(async (data) => {
        // form submission when opened the section form from dashboard
        if (props.fromDashboard) {
          const formDataToSend = JSON.stringify(formData);
          if (props.editSection[0]) {
            try {
              await axios
                .post(`${URL}/section/updatesections`, formDataToSend, {
                  headers: {
                    Authorization: "Bearer " + cookies.jwt,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                })
                .then((response) => {
                  handleCloseSection();
                  alert("Section updated successfully");
                });
            } catch (error) {
              console.error("Error saving question:", error);
            }
          } else {
            try {
              //varToken value to be taken from cookie stored after login
              await axios.post(`${URL}/section/addsections`, formDataToSend, {
                headers: {
                  Authorization: "Bearer " + cookies.jwt,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              });

              // await axios.post("/api/saveSingleQuestion", formDataToSend);
              props.setOpen(false);
              setFormData({
                sectionName: "",
                sectionType: "singleBased",
                numberOfQuestions: 0,
                questions: [],
                sectionDuration: 0,
                sectionCutOff: {
                  gen: 0,
                  obc: 0,
                  sc: 0,
                  st: 0,
                },
                calculatorRequired: false,
                sectionEndProvision: false,
                status: true,
              });
              setQues([]);
            } catch (error) {
              console.error("Error saving question:", error);
            }
          }
        } else {
          props.handleCreateSection.sectionData.push(formData);
          setFormData({
            sectionName: "",
            sectionType: "singleBased",
            numberOfQuestions: 0,
            questions: [],
            sectionDuration: 0,
            sectionCutOff: {
              gen: 0,
              obc: 0,
              sc: 0,
              st: 0,
            },
            calculatorRequired: false,
            sectionEndProvision: false,
            status: true,
          });
          setQues([]);
          // } else {
          //   console.log("In else part");
        }
        // }
      })
      .catch(({ errors }) => setErr(errors?.[0]));

    if (openAlert) {
      setTimeout(() => {
        setOpenAlert(false);
      }, 5000);
    }

    props.setOpen(false);
  };

  const handleCloseSection = () => {
    props.setOpen(false);
    props.setEditSection([]);
  };

  return (
    <Dialog maxWidth="lg" open={props.open} onClose={handleCloseSection}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              props.setOpen(false);
            }}
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
      <DialogTitle id="responsive-dialog-title">
        <Typography variant="h4">{"Sections Form"}</Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            p: "15px 15px",
          }}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmitSection}
        >
          <Stack>
            <Box>
              <TextField
                required
                label="Section Name"
                variant="outlined"
                name="sectionName"
                value={formData.sectionName}
                onChange={handleChange}
                sx={{ width: "450px" }}
              />

              <Select
                name="sectionType"
                value={formData.sectionType}
                label="Section Type"
                placeholder="Section Type"
                onChange={handleChange}
                sx={{ marginLeft: "72px", width: "150px" }}
              >
                <MenuItem value={"singleBased"}>Single based</MenuItem>
                <MenuItem value={"setBased"}>Set based</MenuItem>
                <MenuItem value={"essayBased"}>Essay based</MenuItem>
              </Select>
              <TextField
                required
                disabled
                label="# of Questions"
                variant="outlined"
                name="numberOfQuestions"
                value={formData.numberOfQuestions}
                onChange={handleChange}
                sx={{
                  width: "120px",
                  marginLeft: "72px",
                  marginBottom: "20px",
                }}
              />
            </Box>
          </Stack>
          <Stack mt={4}>
            <FormControl>
              <Box display="flex" gap={4}>
                {refreshData && (
                  <Questions
                    ques={ques}
                    setQues={setQues}
                    questionData={
                      props.editSection[0] ? props.editSection[0] : ""
                    }
                    fromSection={true}
                    refreshQuesData={refreshData}
                    setRefreshQuesData={setRefreshData}
                  />
                )}
              </Box>
            </FormControl>
          </Stack>

          <Stack mt={4}>
            <FormControl>
              <FormLabel required id="demo-row-radio-buttons-group-label">
                Section Cut Off?
              </FormLabel>
              <Box display="flex" sx={{ mt: "20px" }}>
                <TextField
                  label="General"
                  variant="outlined"
                  name="gen"
                  value={cutoff.gen}
                  onChange={handleChangeCutoff}
                  sx={{
                    width: "72px",
                    marginLeft: "10px",
                    marginBottom: "20px",
                  }}
                />
                <TextField
                  label="OBC"
                  variant="outlined"
                  name="obc"
                  value={cutoff.obc}
                  onChange={handleChangeCutoff}
                  sx={{
                    width: "72px",
                    marginLeft: "20px",
                    marginBottom: "20px",
                  }}
                />
                <TextField
                  label="SC"
                  variant="outlined"
                  name="sc"
                  value={cutoff.sc}
                  onChange={handleChangeCutoff}
                  sx={{
                    width: "72px",
                    marginLeft: "20px",
                    marginBottom: "20px",
                  }}
                />
                <TextField
                  label="ST"
                  variant="outlined"
                  name="st"
                  value={cutoff.st}
                  onChange={handleChangeCutoff}
                  sx={{
                    width: "72px",
                    marginLeft: "20px",
                    marginBottom: "20px",
                  }}
                />

                <TextField
                  label="Section Duration (mins)"
                  variant="outlined"
                  name="sectionDuration"
                  value={formData.sectionDuration}
                  onChange={handleChange}
                  sx={{
                    width: "150px",
                    ml: "90px",
                  }}
                />
              </Box>
            </FormControl>
          </Stack>
          <Stack mt={4}>
            <Box>
              <FormControl>
                <FormLabel required id="demo-row-radio-buttons-group-label">
                  Section End Provision?
                </FormLabel>
                <Box display="flex">
                  <RadioGroup
                    row
                    label="Section End Provision?"
                    name="sectionEndProvision"
                    value={formData.sectionEndProvision}
                    onChange={handleChange}
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
                <Box>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="calculatorRequired"
                    value={formData.calculatorRequired}
                    onChange={handleChange}
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
        </Box>
      </DialogContent>
      <DialogActions sx={{ margin: "30px 60px", marginLeft: "px" }}>
        {/* <p style={{ color: "red" }}>{err}</p> */}
        <Button
          size="large"
          sx={{ border: "2px solid #e2e2e2" }}
          onClick={handleCloseSection}
        >
          Cancel
        </Button>
        <Button
          size="large"
          sx={{ border: "2px solid #e2e2e2" }}
          onClick={handleSubmitSection}
        >
          Save Section
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SectionCreate;
