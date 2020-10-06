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
import Chip from "@material-ui/core/Chip";
import {Link} from "react-router-dom";

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
  section: {
    fontSize: 18, //for longer questions
  },
}));
const defaultValues = {
  GSONKeepRulesEnable: "yes",
  LibraryChipInput: [],
  DescriptorChipInput:[],
};

export default function ClassAndDataExceptions() {
  const classes = useStyles();
  const {register, handleSubmit, control} = useForm({defaultValues});
  const [value, setValue] = React.useState('');
  const [aggObfvalue, setAggObfvalue] = React.useState('');
  const [defaultValue,setDefaultValue] = React.useState([]);
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
                  <section className={classes.section}>
                    <label>Do you have any data classes(classes requiring serialization from GSON on initialization)(these will be added to skip since these may cause issues with application behavior or bugs)?</label>
                    <Controller
                      as={
                        <RadioGroup aria-label="gSONKeepRulesEnable">
                          <FormControlLabel
                            value="yes"
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="no"
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      }
                      name="GSONKeepRulesEnable"
                      control={control}
                    />
                    <Typography>Known issues with GSON <a href="https://r8.googlesource.com/r8/+/refs/heads/master/compatibility-faq.md">here</a> </Typography>
                  </section>
                  <section className={classes.section}>
                    <label>Are you using external library jars or aars (like OkHttp3,SQLCipher)?</label>
                    <Typography>Add those packages in below Text Field (case sensitive)<a href="https://r8.googlesource.com/r8/+/refs/heads/master/compatibility-faq.md">here</a> </Typography>
                    <Controller as={
                      <ChipInput
                        aria-label="libraryChipInput"
                        value={defaultValue}
                        control={<Chip />}
                        label="Add Library Packages here"
                      />
                    }
                    name="LibraryChipInput"
                    control={control}
                    />
                    <Typography>These will be added to skip since these may cause issues with application behavior or bugs</Typography>
                  </section>
                  <section className={classes.section}>
                    <label>Do you want to keep some descriptor classes from obfuscation?</label>
                    <Typography>Add those classes in format <i>"class in.uncod.android.bypass.Document"</i> in below Text Field (case sensitive)</Typography>
                    <Controller as={
                      <ChipInput
                        aria-label="descriptorChipInput"
                        value={defaultValue}
                        control={<Chip />}
                        label="Add Library Packages here"
                      />
                    }
                    name="DescriptorChipInput"
                    control={control}
                    />
                    <Typography>This is to make sure some specified field types, method return types and method parameter types are not renamed</Typography>
                  </section>
                </form>
              </Grid>
              <Grid item xs={24} sm={12}>
                <Link to="/basicSetup">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >Back
                  </Button>
                </Link>
                <Link to="/annotationsAndPackages">
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >Next
                  </Button>
                </Link>
              </Grid>
          </Grid>
        </Paper>
      </div>
    </Container>
  );
}
