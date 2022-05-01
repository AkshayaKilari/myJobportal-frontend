import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Checkbox, FormControlLabel, Autocomplete, Chip } from "@mui/material";
import jobService from "../services/jobService";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function JobPost() {
  const navigate = useNavigate()
  const language = ["NA", "JavaScript", "Python", "HTML", "Ruby", "CSS"];
  const tool = ["NA", "React", "Sass", "RoR", "Ruby", "Vue", "Django"];
  const langOptions = [];
  const toolOptions = [];
  let user = JSON.parse(localStorage.getItem("user"));

  const [languages, setLanguages] = React.useState([]);
  const [tools, setTools] = React.useState([]);

  const [isNew, setIsNew] = React.useState(false);
  const [featured, setFeatured] = React.useState(false);
  let today = new Date();
  let date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let jobData = {
      company:user.name,
      position: data.get("position"),
      role: data.get("role"),
      level: data.get("level"),
      contract: data.get("contract"),
      location: data.get("location"),
      languages: languages,
      tools: tools,
      isNew: isNew,
      featured: featured,
      postedAt: date,
    };
    console.log(jobData)
    postTheJob(jobData);
  };

  const postTheJob = async (jobData) => {
    let x = await jobService.postJob(jobData, user.token);
    if(x.message){
    Swal.fire("Good job!", x.message, "success");

    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Post New Job
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="position"
                  required
                  fullWidth
                  id="position"
                  label="Position"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="role"
                  label="Role"
                  name="role"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="level"
                  label="Level"
                  name="level"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="contract"
                  label="Contract"
                  id="contract"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="location"
                  label="Location"
                  id="location"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="fixed-tags-demo"
                  value={languages}
                  onChange={(event, newValue) => {
                    setLanguages([
                      ...langOptions,
                      ...newValue.filter(
                        (option) => langOptions.indexOf(option) === -1
                      ),
                    ]);
                  }}
                  options={language}
                  getOptionLabel={(option) => option}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        disabled={langOptions.indexOf(option) !== -1}
                      />
                    ))
                  }
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Languages"
                      placeholder="Favorites"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  id="fixed-tags-demo"
                  value={tools}
                  onChange={(event, newValue) => {
                    setTools([
                      ...toolOptions,
                      ...newValue.filter(
                        (option) => toolOptions.indexOf(option) === -1
                      ),
                    ]);
                  }}
                  options={tool}
                  getOptionLabel={(option) => option}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        disabled={toolOptions.indexOf(option) !== -1}
                      />
                    ))
                  }
                  style={{ width: 500 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Tools"
                      placeholder="Favorites"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isNew}
                      onChange={(event) => setIsNew(event.target.checked)}
                      color="primary"
                    />
                  }
                  label="New"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={featured}
                      onChange={(event) => setFeatured(event.target.checked)}
                      color="primary"
                    />
                  }
                  label="Featured"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post Job
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>navigate("/company")}
            >
              Go Back
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
