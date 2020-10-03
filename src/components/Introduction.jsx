import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import HighlightTooltip from './highlighttTooltip';
import TextField from '@material-ui/core/TextField';
import Risks from './Risks';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(100),
      height: theme.spacing(100),
    },
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '55ch',
    },
  },
}));
const wordsList = [
]
export default function Introduction() {
  const classes = useStyles();
  const [words,setWords] = React.useState([ "-ignorewarnings","-dontobfuscate","-forceprocessing","-dontpreverify", "-allowaccessmodification","-useuniqueclassmembernames","-overloadaggressively","-keepparameternames"]);
  const [value, setValue] = React.useState('Controlled');
  console.log(JSON.stringify(words));
  //const async wordsList = await(JSON.stringify(words));
//   const listItems = 
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className={classes.root}>
      <Paper elevation={3}>
          <br /><br />
      <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={8}
                      value={words.map((word) =>{
            return  {word};
          } 
          )}
          onChange={handleChange}
          variant="outlined"
        />
      <Risks />
          {/* <Typography>
                {listItems}
          </Typography> */}
      </Paper>
    </div>
  );
}
