import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';



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
  formControl: {
    margin: theme.spacing(3),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
}));
const wordsList = [
]
export default function BasicSetup() {
  const classes = useStyles();
  const [obfuscationFlag, setObfuscationFlag]=React.useState('Obfuscation Disable');
  const [value, setValue] = React.useState('');
  const [aggObfvalue, setAggObfvalue] = React.useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    if (value === 'yes') {
        setObfuscationFlag(true);
    } else if (value === 'no') {
        setObfuscationFlag(false);
    } else {
        setObfuscationFlag(true);
    }
  };
  const handleAggSubmit = (event) => {
    event.preventDefault();
    if (value === 'yes') {
      setAggObfvalue(true);
    } else if (value === 'no') {
      setAggObfvalue(false);
    } else {
      setAggObfvalue(true);
  }
  };
  const handleRadioChange = (event) => {
    setValue(event.target.value);
    
  };
  const handleAggObfRadioChange = (event) => {
    setValue(event.target.aggObfvalue);
    
  };
  return (
    <div className={classes.root}>
      <Paper elevation={3}>

        <Grid container spacing={2}>
            <Grid item xs={24} sm={12}>
                <Typography fontSize="h5.fontSize">Part 1 Obfuscation, Shrinking and Optimization Setup</Typography>
            </Grid>
            <form onSubmit={handleSubmit}>
            <Grid item xs={24} sm={14}>
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Do you want to enable APK Obfuscation?</FormLabel>
                    <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No." />
                    </RadioGroup>
                    <FormHelperText>This option will enable obfuscation using Gradle setup.</FormHelperText>
                </FormControl>
            </Grid>
            </form>
            <form  onSubmit={handleAggSubmit}>              {/* style={classes.form} */}
            <Grid item xs={24} sm={14} alignContent="Left">
                <FormControl component="fieldset" className={classes.formControl}>
                    <FormLabel component="legend">Do you want to enable aggressive Obfuscation?</FormLabel>
                    <RadioGroup aria-label="quiz" name="quiz" value={aggObfvalue} onChange={handleAggObfRadioChange}>
                    <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                    <FormControlLabel value="no" control={<Radio />} label="No." />
                    </RadioGroup>
                    <FormHelperText>A more aggressive obfuscation enabling even better code security </FormHelperText>
                    <FormHelperText> but may cause bugs. </FormHelperText>
                </FormControl>
            </Grid>
            </form>
        </Grid>
      </Paper>
    </div>
  );
}
