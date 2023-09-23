import React, { useState } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useCookies } from "react-cookie";
import {
  Button,
  Stack,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Checkbox,
  FormControl,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  FormLabel,
  Typography,
  Collapse,
  Alert,
} from "@mui/material";
import AddSubQuestion from "./AddSubQuestion";
import CloseIcon from "@mui/icons-material/Close";
import Label from "../../label/Label";
import QuestionvalidationSchema from "../../../components/Validation/Question";
//connection file
import { URL } from "../../../connection";

const QuestionAdd = (props) => {
  //cookies
  const [cookies, setCookie, removeCookie] = useCookies("jwt");
  const [err, setErr] = useState("");
  const [openAlert, setOpenAlert] = useState(false);

  const [formData, setFormData] = useState({
    type: "singleBased",
    question: "",
    questionImage: "",
    hasOptions: false,
    availableOptions: [{ key: "", value: "" }],
    correctTextAnswer: "",
    subQuestions: [],
    solution: "",
    solutionImage: "",
    topic: "",
    subTopic: "",
    difficultyLevel: "",
    markingScheme: [],
    status: true,
    ...props.editQuestion[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeOptions = (e, index) => {
    const { name, value } = e.target;
    const updatedOptions = [...formData.availableOptions];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [name]: value,
    };

    setFormData({
      ...formData,
      availableOptions: updatedOptions,
    });
  };

  const handleAddOption = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      availableOptions: [
        ...prevFormData.availableOptions,
        { key: "", value: "" },
      ],
    }));
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...formData.availableOptions];
    updatedOptions.splice(index, 1);

    setFormData((prevFormData) => ({
      ...prevFormData,
      availableOptions: updatedOptions,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files[0],
    }));
  };

  const handleClose = () => {
    props.setOpenDialog(false);
    props.setEditQuestion([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await QuestionvalidationSchema.isValid(formData);
    if (!isValid) {
      setOpenAlert(true);
    }

    QuestionvalidationSchema.validate(formData)
      .then(async (data) => {
        // if (fromTestFormation) {       
        // } else {
        if (props.fromDashboard) {
          try {
            const formDataToSend = JSON.stringify(formData);
            if (props.editQuestion.length > 0) {
              await axios.put(
                `${URL}/question/updatequestions/${props.editQuestion[0]?._id}`,
                formDataToSend,
                {
                  headers: {
                    Authorization: "Bearer " + cookies.jwt,
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                  },
                }
              );
            } else {
              await axios.post(`${URL}/question/addquestions`, formDataToSend, {
                headers: {
                  Authorization: "Bearer " + cookies.jwt,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*",
                },
              });
            }

            handleClose();
            console.log("Question saved successfully");
          } catch (error) {
            console.error("Error saving question:", error);
          }
        } else {
          props.handleQuestionAdd(formData);        
          setFormData({
            type: "singleBased",
            question: "",
            questionImage: "",
            hasOptions: false,
            availableOptions: [],
            correctTextAnswer: "",
            subQuestions: [],
            solution: "",
            solutionImage: "",
            topic: "",
            subTopic: "",
            difficultyLevel: "",
            markingScheme: [],
            status: true,
          });
        }
      })
      .catch(({ errors }) => setErr(errors?.[0]));

    if (openAlert) {
      setTimeout(() => {
        setOpenAlert(false);
      }, 5000);
    }
    props.setOpenDialog(false);
  };

  return (
    <>
      <Dialog open={props.openDialog} maxWidth={"xl"}>
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
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
          <Typography variant="h4">Questions Form</Typography>
        </DialogTitle>
        <DialogContent sx={{ width: "54vw" }}>
          <Box>
            <Stack>
              <Box display={"flex"} gap={5}>
                <TextField
                  sx={{ marginTop: "15px", width: "390px" }}
                  label="Question"
                  multiline
                  maxRows={Infinity}
                  name="question"
                  variant="outlined"
                  value={formData.question}
                  onChange={handleChange}
                />
                <FormControl>
                  <FormLabel sx={{ fontSize: "12px" }}>Question Type</FormLabel>
                  <Select
                    variant="outlined"
                    placeholder="Type Of Question"
                    value={formData.type}
                    label="Type Of Question"
                    onChange={handleChange}
                    name="type"
                  >
                    <MenuItem value={"singleBased"}>Single Based</MenuItem>
                    <MenuItem value={"setBased"}>Set Based</MenuItem>
                    <MenuItem value={"essayBased"}>Essay Based</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ width: "120px" }}>
                  <FormLabel sx={{ fontSize: "12px" }}>Level</FormLabel>
                  <Select
                    variant="outlined"
                    placeholder="Difficulty Level"
                    value={formData.difficultyLevel}
                    label="Difficulty Level"
                    onChange={handleChange}
                    name="difficultyLevel"
                  >
                    <MenuItem value={"easy"}>Easy</MenuItem>
                    <MenuItem value={"medium"}>Medium</MenuItem>
                    <MenuItem value={"hard"}>Hard</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Stack>
            <Stack>
              <Box display={"flex"} gap={5}>
                <TextField
                  sx={{ marginTop: "30px", width: "390px" }}
                  id="test"
                  label="Topic"
                  type="text"
                  name="topic"
                  variant="outlined"
                  value={formData.topic}
                  onChange={handleChange}
                />
                <TextField
                  sx={{ marginTop: "30px", width: "360px" }}
                  label="Subtopic"
                  type="text"
                  name="subTopic"
                  variant="outlined"
                  value={formData.subTopic}
                  onChange={handleChange}
                />
              </Box>
            </Stack>
            <Button
              variant="contained"
              component="label"
              sx={{ height: "45px", mt: "24px", width: "240px" }}
            >
              Upload Question Image
              <input
                type="file"
                hidden
                label="Question Image"
                name="questionImage"
                variant="standard"
                onChange={handleFileChange}
                accept="image/*"
              />
            </Button>

            {formData.type === "singleBased" ? (
              <>
                <Stack mt={4}>
                  <Box>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Has Options"
                      name="hasOptions"
                      variant="standard"
                      checked={formData.hasOptions}
                      onChange={(e) =>
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          hasOptions: e.target.checked,
                        }))
                      }
                    />
                  </Box>
                </Stack>

                {/* Render availableOptions field if hasOptions is true */}
                {formData.hasOptions && (
                  <Stack>
                    <Label>
                      <Typography variant="body2">Availble Options:</Typography>
                    </Label>
                    {formData.availableOptions.map((option, index) => (
                      <Box
                        key={index}
                        className="option-container"
                        display={"flex"}
                        gap={5}
                      >
                        <TextField
                          sx={{ marginTop: "20px" }}
                          name="key"
                          variant="outlined"
                          value={option.key}
                          onChange={(e) => handleChangeOptions(e, index)}
                          label="Option Key"
                        />
                        <TextField
                          sx={{ marginTop: "20px" }}
                          name="value"
                          variant="outlined"
                          value={option.value}
                          onChange={(e) => handleChangeOptions(e, index)}
                          label="Option Value"
                        />
                        {index > 0 && (
                          <Button
                            variant="outlined"
                            onClick={() => handleRemoveOption(index)}
                            sx={{
                              height: "30px",
                              mt: "39px",
                              width: "120px",
                              fontSize: "10px",
                            }}
                          >
                            Remove Option
                          </Button>
                        )}
                      </Box>
                    ))}
                    <Button
                      variant="outlined"
                      onClick={handleAddOption}
                      sx={{
                        height: "30px",
                        width: "240px",
                        fontSize: "13px",
                        display: "flex",
                        m: "20px auto",
                      }}
                    >
                      Add Option
                    </Button>
                  </Stack>
                )}

                <Stack>
                  <Box display={"flex"} gap={5}>
                    <TextField
                      sx={{ marginTop: "20px", width: "390px" }}
                      label="  Correct Text Answer"
                      variant="outlined"
                      name="correctTextAnswer"
                      value={formData.correctTextAnswer}
                      onChange={handleChange}
                    />
                    <TextField
                      sx={{ marginTop: "20px", width: "360px" }}
                      label="Solution"
                      name="solution"
                      variant="outlined"
                      value={formData.solution}
                      onChange={handleChange}
                      placeholder="Solution"
                    />
                  </Box>
                </Stack>
                <Button
                  variant="contained"
                  component="label"
                  sx={{ height: "45px", mt: "24px", width: "200px" }}
                >
                  Upload Solution Image
                  <input
                    type="file"
                    hidden
                    label="Solution Image"
                    variant="standard"
                    name="solutionImage"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                </Button>
                <Stack>
                  <TextField
                    sx={{ marginTop: "30px" }}
                    variant="outlined"
                    label="Marking Scheme"
                    name="markingScheme"
                    value={formData.markingScheme}
                    onChange={handleChange}
                  />
                </Stack>
              </>
            ) : (
              <>
                <AddSubQuestion formData={formData} setFormData={setFormData} />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <p style={{ color: "red" }}>{err}</p> */}
          <Button
            size="large"
            sx={{ border: "2px solid #e2e2e2" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            size="large"
            sx={{ border: "2px solid #e2e2e2" }}
            onClick={handleSubmit}
            type="submit"
          >
            Save Question
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QuestionAdd;
