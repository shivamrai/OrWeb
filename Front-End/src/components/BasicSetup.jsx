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
    //flexWrap: 'wrap',
    // flexGrow: 1,
    '& > *': {
       margin: theme.spacing(1),
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
          <br />
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
                    <label>Do you want to enable aggresive Obfuscation?</label>
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
                    <label>Do you want to Shrink your output APKs?</label>
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
                    <label>Do you want to enable Optimization?</label>
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
                  </section>
                  <section>
                    <label>Do you want to enable aggresive Optimization?</label>
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
