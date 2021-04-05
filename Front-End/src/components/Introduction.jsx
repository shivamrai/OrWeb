import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Risks from './Risks';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useForm, Controller } from "react-hook-form";
import {Link,useHistory} from "react-router-dom";
import {useStateMachine} from "little-state-machine";
import updateAction from './updateAction';
import {Grid,Button, Typography} from '@material-ui/core';
import FileUpload from './FileUpload';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    '& > *': {
     margin: theme.spacing(1),
     //height: theme.spacing(60),
    },
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width:'60ch',
    },
    '& .MuiTypography-root': {
        margin: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
    },
  },
  grid: {
    margin: theme.spacing(2),
    alignItems: 'center',
    //margin: 'auto',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
  },
}));
const defaultValues = {
};
export default function Introduction() {
  const classes = useStyles();
//  const [words,setWords] = React.useState([ "-ignorewarnings","-dontobfuscate","-forceprocessing","-dontpreverify", "-allowaccessmodification","-useuniqueclassmembernames","-overloadaggressively","-keepparameternames"]);
  const [value, setValue] = React.useState('Controlled');
  const [file, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState('');
  const history = useHistory();
  const {state,action} = useStateMachine(updateAction);
  //file upload function
   async function submitForm() {
       //loader on
       //setLoading(true);
       //setSuccess(false);\
       const formData = new FormData();

      // Update the formData object
      formData.append(
        "myFile",
        file,
        file.name
      );

       console.log(formData);
       await axios.post({
           url: `localhost:5000/upload`,
           data:formData ,
           headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
           }
       }).then((response) => {
           // setResponse(response.data)
           // setFile(response.data);
           //loader off
           // setLoading(false);
           // setSuccess(true);
           //SetNavigateNext(false);
           //setBtnText("Configuration Ready!");
           console.log(response.data);
           console.log("success");
           alert('success');
       }).catch((error) => {
           // setResponse("error");
       })
   }
   function uploadWithFormData() {
      const formData = new FormData();
      formData.append("myFile", file);
      //console.log(file);
      setFileName(file);
      submitForm("multipart/form-data", formData, (msg) => alert("Upload Successful" + msg));
  }
  //console.log(JSON.stringify(words));
  const {handleSubmit, errors, register, control} = useForm({
    defaultValues
  });
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const onSubmit = data => {
    console.log(data);
    action(data);
    history.push("/basicSetup");
  };
  const getDatafromFile = (data) => {

  }
  return (
    <Container component="main" maxWidth="md" fixed={true} >
      <CssBaseline />
        <Box className={classes.root} p={2}>
          <Paper elevation={3} >
          <Grid item xs = {12} class={classes.grid}>
            <Box container class = {classes.box} >
            <Typography variant="h5" margin='auto'>
            Welcome to OrWeb
            </Typography>
            </Box>

          </Grid>
            <br />
          <Grid item xs={12} container justify="center" class={classes.grid}>

          <Typography>
            This is a multi step wizard to generate obfuscation rules compatiable with R8. Obfuscation provides a reverse engineering protection against your apks which can be either cause of intellectual property theft or malicious injection of applications
          </Typography>
          <Typography>
            Did you know that according to research only 20% applications on Google Play are obfuscated.
          </Typography>
          <Typography>
            You would be working through a set of questions that will help us generating obfuscation rules for your project.
          </Typography>
          <Typography>
            There are a few things you need to make note of which will act as hints for answering questions
          </Typography>
          </Grid>
          <Grid item xs={12}>
          <ul>
            <li>
            <Typography gutterBottom>
            <b>Words highlighted with Link:</b> Hover over these links to understand the context of question.
            </Typography>
            </li>
            <li>
            <Typography gutterBottom>
            <b>Issue links:</b> Important to understand a few questions and their importance. These are links to documentation provided by either guardsquare or Google.
            </Typography>
            </li>
            <li>
            <Typography gutterBottom>
            <b>Switches:</b> All the switches provide some extra customizations like making configuration extra aggressive or enabling some options on generated rules.
            </Typography>
            </li>
          </ul>
          </Grid>
          <Grid item xs={12} container>
          <Grid item container class={classes.grid}>
            <Typography>If you already have a configuration, upload to continue</Typography>
          </Grid>
            <Grid item container class={classes.grid}>
              <form onSubmit={
                (state) =>
                {
                  state.preventDefault()
                  // console.log(state)
                  // console.log(file)
                  submitForm()
                }}>
              <input className={classes.root} type="file" name="file" onChange={(e) => {
                setFile(e.target.files[0])
                console.log(e)
                console.log(e.target.files[0])
              }}/>
              <Button  type="submit"> Submit</Button>
            </form>
            </Grid>
          </Grid>
          <Grid item xs={12} container justify="center">
            <Risks />
          </Grid>

              <Grid item  container justify="center" class={classes.grid}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit(onSubmit)}
                >Start
                </Button>
            </Grid>

          </Paper>
        </Box>
    </Container>
  );
}
