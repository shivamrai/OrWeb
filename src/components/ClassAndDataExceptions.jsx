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
import Select from './Select';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useForm, Controller } from "react-hook-form";
import ChipInput from 'material-ui-chip-input'; 

const useStyles = makeStyles((theme) => ({
  root: {
    //display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
     margin: theme.spacing(2),
    //   width: theme.spacing(100),
       height: theme.spacing(100),
    },
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width:'100%',
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
const defaultValues = {
  MinifyEnabled: "yes",
  OverloadAggressively: "no",
  ShrinkResources:"no",
  OptimizationGradle:"no",
  optimizationFullModeR8:"no",
};
const chips = ['test1','test2'];
export default function ClassAndDataExceptions() {
  const classes = useStyles();
  const {register, handleSubmit, control} = useForm({defaultValues});
  const [value, setValue] = React.useState('');
  const [aggObfvalue, setAggObfvalue] = React.useState('');
  //const [yourChips,setYourChips] = React.useState([]);
  // const handleAddChip = (e) =>{
  //   let chip = e.target.value;
  //   //e.preventDefault();
  //   setYourChips([...yourChips, chip]);
  // };
  // const handleDeleteChip = (e) =>{let name = e.target.value;
  //   setYourChips(yourChips.filter((e)=>(e !== name)))
  // };
  return (
    <Container component="main" maxWidth="md" fixed={true}>
    <CssBaseline />
      <div className={classes.root}>
        <Paper elevation={1}>
          <Grid container spacing={2}>
          <br />
              <Grid item xs={24} sm={12}>
                  <Typography variant="h5">Part 1 Obfuscation, Shrinking and Optimization Setup</Typography>
              </Grid>
              <Grid item xs={24} sm={12} alignContent="flex-start" alignItems='flex-start'>
                <form onSubmit={handleSubmit} class={classes.form}>
                  <section>
                    <label>Do you have any data classes(classes requiring serialization from JSON on initialization)(these will be added to skip since these may cause issues with application behavior or bugs)?</label>
                    <Controller
                      as={
                        <ChipInput
                          value={chips}
                          //onAdd={(chip) => handleAddChip(chip)}
                          
                        />
                      }
                      name="MinifyEnabled"
                      control={control}
                    />
                  </section>
                </form>
              </Grid>
              <Grid item xs={24} sm={12}>
                  <Button
                    type="submit"

                    variant="contained"
                    color="secondary"
                  >Next</Button>
              </Grid>
          </Grid>
        </Paper>
      </div>
    </Container>
  );
}
