import React, {useEffect} from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
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
import {Link,useHistory} from "react-router-dom";
import {useStateMachine} from "little-state-machine";
import updateAction from './updateAction';
import Box from '@material-ui/core/Box';
import { pink } from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
  root: {
    //display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    '& > *': {
       margin: theme.spacing(5),
       //height: theme.spacing(105),
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
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  button: {
    margin: theme.spacing(1),
  },
  grid: {
    margin: theme.spacing(2),
  },
  section: {
    //fontSize: 18, //for longer questions
    margin: theme.spacing(1),
  },
  paper: {
    maxHeight: 600,
    overflow: 'auto',
  },
}));

const ObfuscationTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);
const PurpleSwitch = withStyles({
  switchBase: {
    color: pink[300],
    '&$checked': {
      color: pink[500],
    },
    '&$checked + $track': {
      backgroundColor: pink[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const BasicSetup = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(true);
  const [aggObfvalue, setAggObfvalue] = React.useState('');
  const {state,action} = useStateMachine(updateAction);
  let defaultValues = {
    MinifyEnabled: "no",
    OverloadAggressively: "yes",
    ShrinkResources:"no",
    OptimizationGradle:"no",
    OptimizationFullModeR8:"no",
  };
  defaultValues.MinifyEnabled = state.setupDetails.MinifyEnabled;
  defaultValues.OverloadAggressively = state.setupDetails.OverloadAggressively;
  console.log(defaultValues.OverloadAggressively);
  console.log("overLoad", state.setupDetails.OverloadAggressively)

  const {handleSubmit, errors, register, control} = useForm({
    defaultValues,
  });
  useEffect(() => {
    defaultValues = state.setupDetails
  },
  [state],
);
  const shoot = (bool) => {
      if(bool){ return "Yes"}
      else{return "No"}
  }
  const history = useHistory();
  const onSubmit = data => {
    action(data);
    history.push("/classAndDataExceptions");
  };
  const onBack = data => {
    //action(data);
    history.push("/");
  };
  return (
    <Container component="main" maxWidth="md" fixed={true}>
    <CssBaseline />
        <Paper elevation={1} className={classes.paper}>
          <Grid container spacing={2}>
              <Grid item xs={12} container justify="center">
                  <Typography variant="h5">Part 1 Obfuscation, Shrinking and Optimization Setup</Typography>
              </Grid>
              <Grid item xs={12} className={classes.grid}>
                  <Typography>This section deals about some basic choices that you can make regarding obfuscation and R8 features for your project. There are some additional experimental flags included to work.</Typography>
              </Grid>
              <Grid item xs={24} sm={12} alignContent="flex-start" alignItems='flex-start'>
                <form onSubmit={handleSubmit(onSubmit)} class={classes.form}>
                  <section className={classes.section}>
                    <Typography>Do you want to enable{" "}
                    <ObfuscationTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Obfuscation</Typography>
                          {"Obfuscation is the process of hiding code by converting it to meaningless names. This is to enable obfuscation in project's gradle"}
                        </React.Fragment>
                      }
                    >
                      <Link>Obfuscation</Link>
                    </ObfuscationTooltip>{" "}?</Typography>
                    <Controller
                      as={
                        <RadioGroup aria-label="minifyEnabled">
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
                      name="MinifyEnabled"
                      control={control}
                      ref={register}
                    />
                  </section>
                  <section className={classes.section}>
                    <Controller
                      as={
                        <FormControlLabel
                          control={<PurpleSwitch value={defaultValues.OverloadAggressively === "No"}/>}
                          value = {defaultValues.OverloadAggressively === "No"}
                          type="checkbox"
                        />}
                      name="OverloadAggressively"
                      value={defaultValues.OverloadAggressively === "No"}
                      control = {control}
                      ref = {register}
                     />
                     <label>Aggressive{" "}<ObfuscationTooltip
                       title={
                         <React.Fragment>
                           <Typography color="inherit">Aggressive Overloading</Typography>
                           {"This option can make the processed code even smaller (and less comprehensible). Only applicable when obfuscating."}
                         </React.Fragment>
                       }
                     >
                       <Link>Obfuscation</Link>
                     </ObfuscationTooltip>
                    {" "}</label>
                  </section>
                  <section className={classes.section}>
                    <Typography>Do you want to{" "}
                    <ObfuscationTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Resource Shrinking</Typography>
                          {"Code Shrinking or Tree Shaking refers to the removal of unused classes and members from your application or library, primarily to reduce its size. E.g, shrinking can identify library code that your app is not using and remove only that code from your app. Use the same name as much as possible, even if it may not be allowed by the source language. "}
                        </React.Fragment>
                      }
                    >
                      <Link>Shrink</Link>
                    </ObfuscationTooltip>
                     {" "}your output APKs?</Typography>
                    <Controller
                      as={
                        <RadioGroup aria-label="shrinkResources">
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
                      name="ShrinkResources"
                      control={control}
                      ref={register}
                    />
                  </section>
                  <section className={classes.section}>
                    <Typography>Do you want to enable{" "}
                    <ObfuscationTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Code Optimization</Typography>
                          {"Inspects and rewrites your code to further reduce the size of your app’s DEX files. For example, if R8 detects that the else {} branch for a given if/else statement is never taken, R8 removes the code for the else {} branch. "}
                        </React.Fragment>
                      }
                    >
                      <Link>Optimization</Link>
                    </ObfuscationTooltip>
                     {" "}?</Typography>
                    <Controller
                      as={
                        <RadioGroup aria-label="optimizationGradle">
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
                      name="OptimizationGradle"
                      control={control}
                      ref={register}
                    />
                    <Typography>Optimization is still experimental on R8 and is not recommended to use,{" "}
                      <ObfuscationTooltip
                          title={
                            <React.Fragment>
                              <Typography color="inherit">Known Issues.</Typography>
                              {"R8 does not allow you to disable or enable discrete optimizations, or modify the behavior of an optimization. In fact, R8 ignores any ProGuard rules that attempt to modify default optimizations, such as -optimizations and - optimizationpasses. This restriction is important because, as R8 continues to improve, maintaining a standard behavior for optimizations helps the Android Studio team easily troubleshoot and resolve any issues that you might encounter."}
                            </React.Fragment>
                          }
                        >
                          <Link>read more.</Link>
                      </ObfuscationTooltip>
                    </Typography>
                  </section>
                    <section className={classes.section}>
                      <Controller
                        as={
                          <FormControlLabel
                            control={<PurpleSwitch inputRef={register} value={"Yes"} />}
                            // type="checkbox"
                          />}
                        name="OptimizationFullModeR8"
                        //value={"no"}
                        control = {control}
                        setValue={setValue}
                        //ref = {register}
                       />
                       <label>Full Mode{" "}<ObfuscationTooltip
                         title={
                           <React.Fragment>
                             <Typography color="inherit">Experimental Optimization rules.</Typography>
                               {"More Optimization Options enabling R8's full mode(when using “full mode”, R8 does not make this assumption and, if R8 asserts that your code otherwise never uses the class at runtime, it removes the class from your app’s final DEX.). Also inserts a rule -allowaccessmodification(Allows R8 to change access modifiers, enabling additional optimizations and additional reorganizations to packages in which classes are contained.)"}
                           </React.Fragment>
                         }
                       >
                         <Link>Optimization</Link>
                       </ObfuscationTooltip>
                      {" "}</label>

                    <Typography>This configuration puts R8 in full mode, R8 performs more aggressive optimizations, meaning that additional ProGuard configuration rules may be required.</Typography>
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

export default BasicSetup;
