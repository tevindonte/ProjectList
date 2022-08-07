import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputAdornment,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
  Box,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getProjects, postProject } from "../../utils/api";
import SearchIcon from "@material-ui/icons/Search";
import ProjectCard from "../../components/ProjectCard";
import 'bootstrap/dist/css/bootstrap.css';


const useStyles = ({}) =>
  makeStyles((theme) => ({
    root: {
      paddingTop: "40px",
      [theme.breakpoints.up("md")]: {
        maxWidth: "1600px",
      },
    },
    title: { 
      marginBottom: "12 px" ,
      color:"#717476"
    },
    subtitle: {
      color: "#717476",
    },
    textField: {
      backgroundColor: "#fff",
      outline: 0,
    },
    selectField: {
      backgroundColor: "#white",
      outline: 0,
    },
    notchedOutline: {
      borderWidth: "0px",
      borderColor: "rgba(255, 255, 255, 0.0) !important",
      color: "rgb(143,146,149)",
      minWidth: "200px",
    },
    button: {
      height: "100%",
      backgroundColor: "#108AF9",
      color: "#fff",
      textTransform: "inherit",
      padding: "5px 20px",
      "&:hover": {
        backgroundColor: "#106ec4",
      },
    },
    dialogInput: {
      marginBottom: "10px",
    },
  }));

const ProjectsPage = () => {
  const classes = useStyles({})();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setState((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = () => {
    postProject(state).then(() => {
      setState({});
      setOpen(false);
    });
  };

  useEffect(() => {
    getProjects(setData);
  }, []);
  return (
    <Container className={classes.root}>
      <Grid container spacing={5}>
        <Grid item lg={12}>
          <Typography 
          variant={"h4"} 
          className={classes.title}
          fontWeight={'bold'}
          align={'center'}
          >
            <Box sx={{ fontWeight: 'bold', m: 1 }}>Dashboard</Box>
          </Typography>
          <Typography 
          variant={"h7"} 
          className={classes.subtitle}
          align	={'center'}>
          <Box sx={{ fontWeight: 'regular', m: 1 }}>Project List</Box>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            justify={"space-between"}
            alignItems={"center"}>
            <Grid item>
              <TextField
                placeholder="Search Project"
                size="small"
                className={classes.textField}
                variant={"outlined"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  classes: {
                    root: classes.notchedOutline,
                    focused: classes.notchedOutline,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
            </Grid>
            <Grid item>
              <Grid container spacing={2}>
                <Grid item>
                  <TextField
                    select
                    size="small"
                    className={classes.selectField}
                    value={0}
                    variant="outlined"
                    InputProps={{
                      classes: {
                        root: classes.notchedOutline,
                        focused: classes.notchedOutline,
                        notchedOutline: classes.notchedOutline,
                      },
                    }}>
                    <MenuItem value={0}>Sort A-Z Descending</MenuItem>
                    <MenuItem value={1}>Sort A-Z Ascending</MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button}
                    onClick={() => setOpen(true)}>
                    Create Project
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {data.map((item, i) => (
              <Grid item xs={12} sm={6} md={3} lg={2} key={i}>
                <ProjectCard
                  image={item.image}
                  title={item.title}
                  caption={item.caption}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Project</DialogTitle>
        <DialogContent>
          <TextField
            name="image"
            fullWidth
            label="Image Link"
            variant="outlined"
            value={state.image}
            onChange={handleChange}
            className={classes.dialogInput}
          />
          <TextField
            name="title"
            fullWidth
            label="Project Title"
            variant="outlined"
            value={state.projectName}
            onChange={handleChange}
            className={classes.dialogInput}
          />
          <TextField
            name="caption"
            fullWidth
            label="Caption"
            variant="outlined"
            value={state.tags}
            onChange={handleChange}
            className={classes.dialogInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectsPage;
