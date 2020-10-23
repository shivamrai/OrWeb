import React,{useState} from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import axios from 'axios';

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
}));
const defaultValues = {
  PrintseedsStats: "yes",
  R8OutputCFG: "no",
  ShrinkedClassesStats:"no",
  RemoveCommonWarnings:"no",
  WebviewRule:"no",
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
const Diagnostics = (props) => {
  const classes = useStyles();
  const {state,action} = useStateMachine(updateAction);
  const [resData,setResData] = useState({"first" : 1});
  const [reqData,setReqData] = useState(state.setupDetails);
  const {handleSubmit, errors, register, control} = useForm({
    defaultValues
  });
  const [gradleConfig, setGradleConfig] = useState("loading...");
  const [gradleProperties, setGradleProperties] = useState("loading...");
  const [rulesPro, setRulesPro] = useState("loading...");
  const history = useHistory();
  const onSubmit = data => {
    action(data);
    history.push("/result");
  };
  return (
    <Container component="main" maxWidth="md" fixed={true}>
    <CssBaseline />
      <div className={classes.root}>
        <Paper elevation={1}>
          <Grid container spacing={2}>
          <br />
              <Grid item xs={24} sm={12}>
                  <Typography variant="h5">Part 4 Print Diagnostics Setup</Typography>
                  <Typography>This section specifies the rules that enable tracing issues through stdout.</Typography>
                  <Typography>You can later on add a filename in front of this rules generated on this page to output to a file.</Typography>
              </Grid>
              <Grid item xs={24} sm={12} alignContent="flex-start" alignItems='flex-start'>
                <form onSubmit={handleSubmit} class={classes.form}>
                  <section>
                    <label>Do you want information of classes{" "}
                    <ObfuscationTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">List of whitelisted classes from R8</Typography>
                          {"Outputs a list of the classes, methods, and fields which match the keep rules to the console."}
                        </React.Fragment>
                      }
                    >
                      <Link>skipped</Link>
                    </ObfuscationTooltip>{" "}during obfuscation?</label>
                    <Controller
                      as={
                        <RadioGroup aria-label="printseedsStats">
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
                      name="PrintseedsStats"
                      control={control}
                      ref = {register}
                    />
                  </section>
                  <section>
                    <label>Do you want to view the final set of{" "}
                    <ObfuscationTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">All rules applied by R8</Typography>
                          {"Outputs the used configuration rules to the console."}
                        </React.Fragment>
                      }
                    >
                      <Link>rules</Link>
                    </ObfuscationTooltip>{" "}generated by R8 after build?</label>
                    <Controller
                      as={
                        <RadioGroup aria-label="r8OutputCFG">
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
                      name="R8OutputCFG"
                      control={control}
                      ref = {register}
                    />
                  </section>
                  <section>
                    <label>Do you want to view classes which were{" "}
                    <ObfuscationTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Removed Code</Typography>
                          {"Outputs a list of the classes, methods, and fields which were removed during shrinking to the console."}
                        </React.Fragment>
                      }
                    >
                      <Link>removed</Link>
                    </ObfuscationTooltip>{" "}during shrinking?</label>
                    <Controller
                      as={
                        <RadioGroup aria-label="shrinkedClassesStats">
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
                      name="ShrinkedClassesStats"
                      control={control}
                      ref = {register}
                    />
                  </section>
                </form>
              </Grid>
              <Grid item xs={24} sm={12}>
                <Link to="/annotationsAndPackages">
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
export default Diagnostics;
