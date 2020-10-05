import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import HighlightTooltip from './highlighttTooltip';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(100),
      height: theme.spacing(80),
    },
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '55ch',
    },
  },
}));
const wordsList = [
]
export default function TextEditor() {
  const classes = useStyles();
  const [words,setWords] = React.useState([ "-ignorewarnings","-dontobfuscate","-forceprocessing","-dontpreverify", "-allowaccessmodification","-useuniqueclassmembernames","-overloadaggressively","-keepparameternames"]);
  const [value, setValue] = React.useState('Controlled');
  const listItems = words.map((rule) =>
  <HighlightTooltip propTest = {rule}></HighlightTooltip>
);;

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className={classes.root}>
      <Paper elevation={3}>

        <Grid container spacing={1}>
          <Grid item xs={24} sm={12}>
            <Typography>
              These is the configuration generated for project's <settings className="gradle"></settings>.
            </Typography>
            <Box bgcolor="text.disabled" color="background.paper" p={2}>
              {listItems}
            </Box>
          </Grid>
          <Grid item xs={24} sm={12}>
            <Typography>
              These are the rules generated as per your answers, copy these to proguard rules.pro.
            </Typography>
            <Box bgcolor="text.disabled" color="background.paper" p={2}>
              {listItems}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
