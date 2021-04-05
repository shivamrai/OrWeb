import React from 'react';
import { makeStyles ,withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
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
      //fontSize: 18, //for longer questions
      margin: theme.spacing(2),

    },
    button: {
      margin: theme.spacing(1),
    },
    chipInput:{
      flexGrow:1,
    },
    grid: {
      margin: theme.spacing(2),
    },
    paper: {
      maxHeight: 600,
      overflow: 'auto',
    },
}));
const defaultValues = {
  GSONKeepRulesEnable: "yes",
  LibraryChipInput: ["Tes3","Tes4"],
  DataClassChipInput: ["Tes1","Tes2"],
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
  const onBack = data => {
    //action(data);
    history.push("/basicSetup");
  };
  return (
    <Container component="main" maxWidth="md" fixed={true}>
    <CssBaseline />
        <Paper elevation={1} className={classes.paper}>
          <Grid container spacing={2}>
              <Grid item xs={12} container justify="center">
                  <Typography variant="h5">Part 2 Data classes and JARs/AARs</Typography>
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                  <Typography>This section specifies the rules that help us keep some important exceptions from obfuscation as the applications may cause runtime issues due to obfuscation of these classes/libraries. There are some links added to get a guide on covered exceptions.</Typography>
              </Grid>
              <Grid item xs={12} >
                <form onSubmit={handleSubmit(onSubmit)} class={classes.form}>
                  <section className={classes.section}>
                    <Typography>Do you have any{" "}
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
                    {" "}classes(classes requiring serialization from GSON on initialization)(these will be added to skip since these may cause issues with application behavior or bugs)?</Typography>
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
                      <Typography>Are you using data classes without{" "}
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
                      </Typography>
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
                      <Typography>Add those classes in format <i>"class in.uncod.android.bypass.Document"</i> in below Text Field (case sensitive)</Typography>
                      <Typography>These will be added to skip since these may cause issues with application behavior or bugs</Typography>
                    </section>
                  </Grid>
                  <section className={classes.section}>
                    <Typography>Do you want to keep specific class names from obfuscation{" "}
                    <ObfuscationTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">External Libraries</Typography>
                          {"This will ensure that external libraries will not be obfuscated. Sometimes there are issues accessing methods of external classes and this rule helps to avoid those issues.\n"}
                          <b>{"\nProguard Considerations: If you are shrinking your code, you need to prevent your Parcelable, Serializable, and Enum class names from being obfuscated as part of the minification process. "}</b>
                        </React.Fragment>
                      }
                    >
                      <Link>libraries</Link>
                    </ObfuscationTooltip>
                    {" "}in your project (like OkHttp3)?</Typography>
                    <Controller as={
                      <ChipInput
                        aria-label="libraryChipInput"
                        control={<Chip />}
                        label="Add correct Class names."
                      />
                    }
                    name="LibraryChipInput"
                    control={control}
                    ref={register}
                    />
                    <Typography>Add <ObfuscationTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">External Libraries</Typography>
                          {"A resource like a library is loaded with a relative path so the package of this class must be preserved from obfuscation to avoid errors."}
                        </React.Fragment>
                      }
                    >
                      <Link>these</Link>
                    </ObfuscationTooltip> classes/packages/libraries in below Text Field (case sensitive and specify complete names)<a href="https://r8.googlesource.com/r8/+/refs/heads/master/compatibility-faq.md">here</a> </Typography>
                    <Typography>Specify complete names so that correct packages can be targeted, eg for OkHttp3 <i>okhttp3.internal.publicsuffix.PublicSuffixDatabase </i><a href="https://github.com/square/okhttp/blob/master/okhttp/src/main/resources/META-INF/proguard/okhttp3.pro">Read about the fix here.</a></Typography>
                    <Typography>You can also add some classes of <ObfuscationTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">ProGuard considerations</Typography>
                          {"If you are shrinking your code, you need to prevent your Parcelable, Serializable, and Enum class names from being obfuscated as part of the minification process."}
                        </React.Fragment>
                      }
                    >
                      <Link>EnumArg/ParcelableArg/SerializableArg</Link>
                    </ObfuscationTooltip> type for R8 considerations <i>com.path.to.your.EnumArg/ParcelableArg/SerializableArg </i><a href="https://developer.android.com/guide/navigation/navigation-pass-data#proguard_considerations">More about this issue</a></Typography>
                  </section>
              </form>
            </Grid>
            <Grid item xs={6} sm={3} container justify="center" >
            </Grid>
            <Grid item xs={6} sm={3} container justify="center" >
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
                onClick={handleSubmit(onBack)}
              >Back
              </Button>
                </Grid>
                  <Grid item xs={6} sm={3} container justify="center" >
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit(onSubmit)}
              >Next
              </Button>
            </Grid>
            <Grid item xs={6} sm={3} container justify="center" >
            </Grid>
          </Grid>
        </Paper>
    </Container>
  );
}
export default ClassAndDataExceptions;
