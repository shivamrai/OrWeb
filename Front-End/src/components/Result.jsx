import React,{ useState, useEffect ,useRef} from 'react';
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
import AceEditor from "react-ace";
import { useForm, Controller } from "react-hook-form";
import updateAction from './updateAction';
import {useStateMachine} from "little-state-machine";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
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
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,

  },
}));
const defaultValues = {
};
export default function Result() {
  const classes = useStyles();
  const {state} = useStateMachine(updateAction);
  const aceGradlePropertiesRef = useRef(null);
  const aceGradleConfigRef = useRef(null);
  const aceRulesProRef = useRef(null);
  const [reqData,setReqData] = useState(state.setupDetails);
  const [gradleConfig, setGradleConfig] = useState("loading...");
  const [gradleProperties, setGradleProperties] = useState("loading...");
  const [rulesPro, setRulesPro] = useState("loading...");
  const fetchData = () =>{
    //console.log(data);
    axios.post('http://localhost:5000/submit_form',reqData)
    .then(async (response)=>{
        //await setResData(response.data)
        console.log(response.data)
        await setGradleConfig(response.data.gradleConfig)
        await setGradleProperties(response.data.gradleProperties)
        await setRulesPro(response.data.rulesPro)
        console.log(gradleConfig)
    });
  }
  useEffect(() => {
      fetchData();
    },[gradleConfig,gradleProperties,rulesPro]);
  return (
    <Container component="main" maxWidth="md" fixed={true}>
    <CssBaseline />
      <div className={classes.root}>
        <Paper elevation={1}>
          <Grid container spacing={2}>
          <br />
              <Grid item xs={24} sm={12}>
                  <Typography variant="h5">Part 5 Genarated Configs</Typography>
              </Grid>
              <Grid item xs={24} sm={12}>
              <Typography>Copy the following in your gradle.properties file</Typography>
                <AceEditor
                    placeholder="Placeholder Text"
                    mode="markdown"
                    theme="monokai"
                    name="ace-editor-finaloutput"
                    fontSize={12}
                    showPrintMargin={true}
                    showGutter={true}
                    scrollMargin={2}
                    height={50}
                    width = {'100%'}
                    highlightActiveLine={true}
                    value={gradleProperties}
                    ref = {aceGradlePropertiesRef}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                  />
              </Grid>
              <Grid item xs={24} sm={12} alignContent="flex-start" alignItems='flex-start'>
              <Typography>Copy the following in your Project Gradle</Typography>
                <AceEditor
                    placeholder="Placeholder Text"
                    mode="markdown"
                    theme="monokai"
                    name="ace-editor-finaloutput"
                    fontSize={12}
                    showPrintMargin={true}
                    showGutter={true}
                    scrollMargin={2}
                    height={50}
                    width = {'100%'}
                    highlightActiveLine={true}
                    value={gradleConfig}
                    ref = {aceGradleConfigRef}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                />
              </Grid>
              <Grid item xs={24} sm={12} alignContent="flex-start" alignItems='flex-start'>
                <Typography>Copy the following in your proguard-rules.pro file</Typography>
                <AceEditor
                    placeholder="Placeholder Text"
                    mode="markdown"
                    theme="monokai"
                    name="ace-editor-finaloutput"
                    fontSize={12}
                    showPrintMargin={true}
                    showGutter={true}
                    scrollMargin={2}
                    height={200}
                    width = {'100%'}
                    highlightActiveLine={true}
                    value={rulesPro}
                    ref = {aceRulesProRef}
                    setOptions={{
                        enableBasicAutocompletion: false,
                        enableLiveAutocompletion: false,
                        enableSnippets: false,
                        showLineNumbers: true,
                        tabSize: 2,
                    }}
                  />
              </Grid>
              <Grid item xs={24} sm={12}>
                  <Button
                    type="submit"
                    disabled
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
