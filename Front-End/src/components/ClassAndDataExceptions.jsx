import React from 'react';
import { makeStyles ,withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
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
import {Link,useHistory} from "react-router-dom";
import {useStateMachine} from "little-state-machine";
import updateAction from './updateAction';

const useStyles = makeStyles((theme) => ({
    root: {
      flexWrap: 'wrap',
      flexGrow: 1,
      '& > *': {
        margin: theme.spacing(2),
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
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    },
    section: {
      fontSize: 18, //for longer questions
      margin: theme.spacing(1),
      alignItems:"left",
      alignContent:"left",
      justifyContent: "flex-start",
    },
}));
const defaultValues = {
  GSONKeepRulesEnable: "yes",
  LibraryChipInput: [],
  DataClassChipInput: [],
};

const ObfuscationTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const ClassAndDataExceptions = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [aggObfvalue, setAggObfvalue] = React.useState('');
  const {state,action} = useStateMachine(updateAction);
  const {handleSubmit, errors, register, control} = useForm({
    defaultValues
  });
  const history = useHistory();
  const onSubmit = data => {
    action(data);
    history.push("/annotationsAndPackages");
  };
  return (
    <Container component="main" maxWidth="md" fixed={true}>
    <CssBaseline />
      <div className={classes.root}>
        <Paper elevation={1}>
          <Grid container spacing={2}>
              <Grid item xs={24} sm={12}>
                  <Typography variant="h5">Part 2 Data classes and JARs/AARs</Typography>
              </Grid>
              <Grid item xs={24} sm={12} alignContent="flex-start" justifyContent="flex-start">
                <form onSubmit={handleSubmit(onSubmit)} class={classes.form}>
                  <section className={classes.section}>
                    <label>Do you have any{" "}
                    <ObfuscationTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">GSON Serialized Data Classes</Typography>
                          {"For data classes used for serialization all fields that are used in the serialization must be kept by the configuration. R8 can decide to replace instances of types that are never instantiated with null. So if instances of a given class are only created through deserialization from JSON, R8 will not see that class as instantiated leaving it as always null."}
                        </React.Fragment>
                      }
                    >
                      <Link>data</Link>
                    </ObfuscationTooltip>
                    {" "}classes(classes requiring serialization from GSON on initialization)(these will be added to skip since these may cause issues with application behavior or bugs)?</label>
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
                      ref={register}
                    />
                    <Typography>Known issues with GSON <a href="https://r8.googlesource.com/r8/+/refs/heads/master/compatibility-faq.md">here</a> </Typography>
                  </section>
                  <Grid item xs={24} sm={12} alignContent="flex-start" alignItems='flex-start'>
                    <section className={classes.section}>
                      <label>Are you using data classes without{" "}
                      <ObfuscationTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">@SerializedName</Typography>
                            {"This will ensure that all fields are kept and not renamed for these classes. Fields with modifier transient are never serialized and therefore keeping these is not needed."}
                          </React.Fragment>
                        }
                      >
                        <Link>@SerializedName</Link>
                      </ObfuscationTooltip>
                      {" "}annotation?
                      </label>
                      <Typography>Add those classes in format <i>"class in.uncod.android.bypass.Document"</i> in below Text Field (case sensitive)</Typography>
                      <Controller as={
                        <ChipInput
                          aria-label="dataClassChipInput"
                          control={<Chip />}
                          label="Add Optional Data classes"
                        />
                      }
                      name="DataClassChipInput"
                      control={control}
                      ref={register}
                      />
                      <Typography>These will be added to skip since these may cause issues with application behavior or bugs</Typography>
                    </section>
                  </Grid>
                  <section className={classes.section}>
                    <label>Are you using external library jars or aars (like OkHttp3,SQLCipher)?</label>
                    <Typography>Add those packages in below Text Field (case sensitive)<a href="https://r8.googlesource.com/r8/+/refs/heads/master/compatibility-faq.md">here</a> </Typography>
                    <Controller as={
                      <ChipInput
                        aria-label="libraryChipInput"
                        control={<Chip />}
                        label="Add Library Packages here"
                      />
                    }
                    name="LibraryChipInput"
                    control={control}
                    ref={register}
                    />
                    <Typography>These will be added to skip since these may cause issues with application behavior or bugs</Typography>
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
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit(onSubmit)}
                  >Next
                </Button>
              </Grid>
          </Grid>
        </Paper>
      </div>
    </Container>
  );
}
export default ClassAndDataExceptions;
