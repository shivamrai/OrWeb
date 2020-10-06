import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import HighlightTooltip from './highlighttTooltip';
import TextField from '@material-ui/core/TextField';
import Risks from './Risks';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  root: {
    //display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
     margin: theme.spacing(2),
     height: theme.spacing(100),
    },
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width:'50ch',
    },
  },
}));

export default function Introduction() {
  const classes = useStyles();
  const [words,setWords] = React.useState([ "-ignorewarnings","-dontobfuscate","-forceprocessing","-dontpreverify", "-allowaccessmodification","-useuniqueclassmembernames","-overloadaggressively","-keepparameternames"]);
  const [value, setValue] = React.useState('Controlled');
  console.log(JSON.stringify(words));
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <Container component="main" maxWidth="md" fixed={true}>
      <CssBaseline />
        <div className={classes.root}>
          <Paper elevation={3}>
          <TextField
              id="outlined-multiline-static"
              label="Multiline"
              multiline
              rows={8}
              value={setValue}
              onChange={handleChange}
              variant="outlined"
            />
          <Risks />

          </Paper>
        </div>
    </Container>
  );
}
