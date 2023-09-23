import React, { useEffect, useState } from "react";
import {
  styled,
  Button,
  Box,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Checkbox,
  Typography,
  FormControl,
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Label from "../../label/Label";
import { width } from "@mui/system";
import QuestionvalidationSchema from "../../../components/Validation/Question";

const AddSubQuestion = ({ formData, setFormData }) => {
  const [err, setErr] = useState("");
  const [initial, setInitial] = useState({
    type: "singleBasedType",
    question: "",
    questionImage: "",
    hasOption: false,
    availableOptions: [{ key: "", value: "" }],
    correctTextAnswer: "",
    solution: "",
    solutionImage: "",
    topic: "",
    subTopic: "",
    difficultyLevel: "",
    markingScheme: [
      { type: "correct", score: 0 },
      { type: "incorrect", score: 0 },
      { type: "noresponse", score: 0 },
    ],
  });
  const [subQuestion, setSubQuestion] = useState(initial);
  const handleChange = (e, index) => {
    // console.log("IN HANDLE CHANGE");
    const { name, value } = e.target;
    const updatedOptions = [...subQuestion.availableOptions];
    updatedOptions[index] = {
      ...updatedOptions[index],
      [name]: value,
    };

    setSubQuestion({
      ...subQuestion,
      availableOptions: updatedOptions,
    });
  };
  const handleAddOption = () => {
    setSubQuestion((prevFormData) => ({
      ...prevFormData,
      availableOptions: [
        ...prevFormData.availableOptions,
        { key: "", value: "" },
      ],
    }));
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = [...subQuestion.availableOptions];
    updatedOptions.splice(index, 1);

    setSubQuestion((prevFormData) => ({
      ...prevFormData,
      availableOptions: updatedOptions,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setSubQuestion((prevFormData) => ({
      ...prevFormData,
      [name]: files[0],
    }));
  };
  const handleChangeTextIput = (e) => {
    const { name, value } = e.target;
    setSubQuestion({
      ...subQuestion,
      [name]: value,
    });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    QuestionvalidationSchema.validate(subQuestion)
      .then((data) => {
        const arr = [...formData.subQuestions, subQuestion];
        setFormData({ ...formData, subQuestions: arr });
        setSubQuestion(initial);
        setErr("")
      })
      .catch(({ errors }) => setErr(errors[0]));
  };

  const [iterate, setIterate] = useState(formData.subQuestions);
  useEffect(() => {
    setIterate(formData.subQuestions);
    // console.log(iterate);
  }, [formData]);

  const deleteAdd = (e, index) => {
    e.preventDefault();
    const arr = formData.subQuestions.filter((ele, id) => {
      return index != id;
    });
    setFormData({ ...formData, subQuestions: arr });
  };

  return (
    <Box>
      <Stack>
        <Typography variant="h6" mt={5}>
          Sub-Question Section
        </Typography>
        <Box display={"flex"} gap={5}>
          <TextField
            sx={{ marginTop: "20px", width: "390px" }}
            label="Question"
            multiline
            maxRows={Infinity}
            name="question"
            value={subQuestion.question}
            onChange={handleChangeTextIput}
          />
          <Button
            variant="contained"
            sx={{ height: "45px", mt: "24px", width: "240px" }}
          >
            Upload Sub-Question Image
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
        </Box>
      </Stack>
      <Stack>
        <Box
          className="showSubquestions"
          display={"flex"}
          flexWrap={"wrap"}
          mt={3}
        >
          {iterate.map((ele, index) => {
            return (
              <Box
                key={index}
                sx={{
                  border: "2px solid #E0E0E0",
                  margin: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "10px",
                  padding: "5px",
                }}
              >
                <Typography variant="body2" width={100} fontSize={15}>
                  Question: {index + 1}
                </Typography>
                <DeleteOutlineIcon onClick={(e) => deleteAdd(e, index)} />
              </Box>
            );
          })}
        </Box>
      </Stack>
      <Stack>
        <Box display={"flex"} justifyContent={"space-between"}>
          <FormControlLabel
            sx={{ mt: "30px" }}
            control={<Checkbox />}
            label="Has Options"
            name="hasOptions"
            variant="standard"
            checked={subQuestion.hasOptions}
            onChange={(e) =>
              setSubQuestion((prevsubQuestion) => ({
                ...prevsubQuestion,
                hasOptions: e.target.checked,
              }))
            }
          />
        </Box>
        <Stack>
          <Box>
            {/* Render availableOptions field if hasOptions is true */}
            {subQuestion.hasOptions && (
              <FormControl sx={{ mt: "30px" }}>
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
                      sx={{ mt: "20px" }}
                      name="key"
                      variant="outlined"
                      value={option.key}
                      onChange={(e) => handleChange(e, index)}
                      label="Option Key"
                    />
                    <TextField
                      sx={{ mt: "20px" }}
                      name="value"
                      variant="outlined"
                      value={option.value}
                      onChange={(e) => handleChange(e, index)}
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
                  sx={{
                    height: "30px",
                    width: "240px",
                    fontSize: "13px",
                    display: "flex",
                    m: "20px auto",
                  }}
                  onClick={handleAddOption}
                >
                  Add Option
                </Button>
              </FormControl>
            )}
          </Box>
        </Stack>

        <Stack>
          <Typography variant="h6" mt={5}>
            Sub-Question Solution Section
          </Typography>
          <Box display={"flex"} gap={5}>
            <TextField
              sx={{ marginTop: "20px", width: "390px" }}
              label="Correct Text Answer"
              type="text"
              name="correctTextAnswer"
              value={subQuestion.correctTextAnswer}
              onChange={handleChangeTextIput}
              placeholder="Correct Text Answer"
            />
            <TextField
              sx={{ marginTop: "20px", width: "360px" }}
              label="Solution"
              multiline
              maxRows={Infinity}
              name="solution"
              value={subQuestion.solution}
              onChange={handleChangeTextIput}
              placeholder="Solution"
            />
          </Box>
          <Stack>
            <Box display={"flex"} gap={5}>
              <TextField
                sx={{ marginTop: "30px", width: "390px" }}
                id="test"
                label="Topic"
                type="text"
                name="topic"
                variant="outlined"
                value={subQuestion.topic}
                onChange={handleChangeTextIput}
              />
              <TextField
                sx={{ marginTop: "30px", width: "360px" }}
                label="Subtopic"
                type="text"
                name="subTopic"
                variant="outlined"
                value={subQuestion.subTopic}
                onChange={handleChangeTextIput}
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
              lable="Solution Image"
              variant="standard"
              name="solutionImage"
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
        </Stack>
        <Stack>
          {/* <Box> */}
          <TextField
            sx={{ mt: "36px" }}
            label="Marking Scheme"
            type="text"
            name="markingScheme"
            value={subQuestion.markingScheme}
            onChange={handleChangeTextIput}
            placeholder="Marking Scheme"
          />

          {/* </Box> */}
          <p style={{ color: "red" }}>{err}</p>
          <Button
            variant="contained"
            sx={{ mt: "30px", width: "240px", m: "30px auto" }}
            onClick={handleAdd}
          >
            Add
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default AddSubQuestion;
