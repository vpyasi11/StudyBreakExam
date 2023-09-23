import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/system";
const SectionEdit = ({ section, onUpdate, index, open, setOpen }) => {
  const [formData, setFormData] = useState(section);
  const [cutoff, setCutOff] = useState(section.sectionCutOff);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData, index);
    // console.log(formData);
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
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
        <Typography variant="h4">{"Edit Section"}</Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            p: "15px 15px",
          }}
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
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
                <MenuItem value={10}>Single based</MenuItem>
                <MenuItem value={20}>Set based</MenuItem>
                <MenuItem value={30}>Essay based</MenuItem>
              </Select>
              <TextField
                required
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
          Save Section
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SectionEdit;
