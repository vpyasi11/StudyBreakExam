import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Stack,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const TestFormationEdit = ({
  testFormation,
  onUpdateTest,
  index,
  open,
  setOpen,
}) => {
  // console.log(index);
  const [formData, setFormData] = useState(testFormation);
  const [testsCutOff, setTestsCutOff] = useState({
    gen: 0,
    obc: 0,
    sc: 0,
    st: 0,
  });

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateTest(formData, index);
    // console.log(formData);
    setOpen(false);
  };

  return (
    <Dialog maxWidth="lg" open={open} onClose={handleClose}>
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              setOpen(false);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <DialogTitle id="responsive-dialog-title">
        <Typography variant="h4">{"Edit Test Formation"}</Typography>
      </DialogTitle>
      <DialogContent>
        <div className="testFormation">
          <Box
            sx={{
              p: "15px 15px",
            }}
            onSubmit={handleSubmit}
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
              />
            </Stack>

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
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          size="large"
          sx={{ border: "2px solid #e2e2e2" }}
          onClick={handleSubmit}
        >
          Save Test
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TestFormationEdit;
