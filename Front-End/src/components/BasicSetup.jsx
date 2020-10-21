import React from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
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
import {Link,useHistory} from "react-router-dom";
import {useStateMachine} from "little-state-machine";
import updateAction from './updateAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    flexGrow: 1,
    '& > *': {
       margin: theme.spacing(5),
       height: theme.spacing(105),
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
}));
const defaultValues = {
  MinifyEnabled: "yes",
  OverloadAggressively: "no",
  ShrinkResources:"no",
  OptimizationGradle:"no",
  OptimizationFullModeR8:"no",
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
const BasicSetup = (props) => {
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
    history.push("/classAndDataExceptions");
  };
  return (
    <Container component="main" maxWidth="md" fixed={true}>
    <CssBaseline />
      <div className={classes.root}>
        <Paper elevation={1}>
          <Grid container spacing={2}>
              <Grid item xs={24} sm={12}>
                  <Typography variant="h5">Part 1 Obfuscation, Shrinking and Optimization Setup</Typography>
              </Grid>
              <Grid item xs={24} sm={12} alignContent="flex-start" alignItems='flex-start'>
                <form onSubmit={handleSubmit(onSubmit)} class={classes.form}>
                  <section>
                    <label>Do you want to enable</label>
                    <ObfuscationTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Obfuscation</Typography>
                          {"Obfuscation is the process of hiding code by converting it to meaningless names. This is to enable obfuscation in project's gradle"}
                        </React.Fragment>
                      }
                    >
                      <Link> Obfuscation?</Link>
                    </ObfuscationTooltip>
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
                  <section>
                    <label>Do you want to enable{" "}
                    <ObfuscationTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Aggressive Overloading</Typography>
                          {"This option can make the processed code even smaller (and less comprehensible). Only applicable when obfuscating."}
                        </React.Fragment>
                      }
                    >
                      <Link>Aggressive</Link>
                    </ObfuscationTooltip>
                   {" "}Obfuscation?</label>
                    <Controller
                      as={
                        <RadioGroup aria-label="overloadaggressively">
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
                      name="OverloadAggressively"
                      control={control}
                      ref={register}
                    />
                  </section>
                  <section>
                    <label>Do you want to{" "}
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
                     {" "}your output APKs?</label>
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
                  <section>
                    <label>Do you want to enable{" "}
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
                     {" "}?</label>
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
                  <section>
                    <label>Do you want to enable{" "}
                    <ObfuscationTooltip
                        title={
                          <React.Fragment>
                            <Typography color="inherit">Experimental Optimization rules.</Typography>
                            {"More Optimization Options enabling R8's full mode(when using “full mode”, R8 does not make this assumption and, if R8 asserts that your code otherwise never uses the class at runtime, it removes the class from your app’s final DEX.). Also inserts a rule -allowaccessmodification(Allows R8 to change access modifiers, enabling additional optimizations and additional reorganizations to packages in which classes are contained.)"}
                          </React.Fragment>
                        }
                      >
                        <Link>aggresive</Link>
                    </ObfuscationTooltip>
                    {" "}Optimization?</label>
                    <Controller
                      as={
                        <RadioGroup aria-label="optimizationFullModeR8">
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
                      name="OptimizationFullModeR8"
                      control={control}
                      ref={register}
                    />
                    <Typography>This configuration puts R8 in full mode, R8 performs more aggressive optimizations, meaning that additional ProGuard configuration rules may be required.</Typography>
                  </section>
                </form>
              </Grid>
              <Grid item xs={24} sm={12}>
                <Link to="/">
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

export default BasicSetup;
