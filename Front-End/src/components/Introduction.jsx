import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
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
     margin: theme.spacing(10),
     height: theme.spacing(60),
    },
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width:'50ch',
    },
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
    <Container component="main" maxWidth="md" fixed={true}>
      <CssBaseline />
        <div className={classes.root}>
          <Paper elevation={3}>
            <Typography variant="h5">
            Welcome to OrWeb
            </Typography>
            <br />
            <Typography>
              This is a multi step wizard to generate obfuscation rules compatiable with R8.
            </Typography>
            <Typography>
              obfuscation
            </Typography>
          <br />
          <Risks />
              <Grid item xs={24} sm={12}>
                <br />
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
        </div>
    </Container>
  );
}
