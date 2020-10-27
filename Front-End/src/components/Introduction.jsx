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
  const [words,setWords] = React.useState([ "-ignorewarnings","-dontobfuscate","-forceprocessing","-dontpreverify", "-allowaccessmodification","-useuniqueclassmembernames","-overloadaggressively","-keepparameternames"]);
  const [value, setValue] = React.useState('Controlled');
  const history = useHistory();
  const {state,action} = useStateMachine(updateAction);
  console.log(JSON.stringify(words));
  const {handleSubmit, errors, register, control} = useForm({
    defaultValues
  });
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const onSubmit = data => {
    action(data);
    history.push("/basicSetup");
  };
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
          <Grid item xs={24} container justify="center" class={classes.grid}>

          <Typography>
            This is a multi step wizard to generate obfuscation rules compatiable with R8.
          </Typography>
        <br />
          </Grid>

          <Grid item xs={24} container justify="center">
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
