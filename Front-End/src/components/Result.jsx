import React,{ useState, useEffect ,useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import AceEditor from "react-ace";
import updateAction from './updateAction';
import {useStateMachine} from "little-state-machine";
import axios from 'axios';
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";
import {useHistory} from "react-router-dom";
import { useForm } from "react-hook-form";


const useStyles = makeStyles((theme) => ({

  root: {
    flexWrap: 'wrap',
    display: "flex",
    justifyContent: "center",
    listStyle: "none",
    padding: theme.spacing(0.5),
    '& > *': {
     margin: theme.spacing(2),
     height: theme.spacing(100),
    },
    '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width:'100%',
    },
  },
  paper:{
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(0.5),
    margin: 0,
    height: theme.spacing(6),
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
  chip: {
    margin: theme.spacing(0.5),
    height: theme.spacing(4),
  },
}));
const defaultValues = {
};
export default function Result() {
  const classes = useStyles();
  const {state,action} = useStateMachine(updateAction);
  const {handleSubmit, errors, register, control} = useForm({
    defaultValues
  });
  const aceGradlePropertiesRef = useRef(null);
  const aceGradleConfigRef = useRef(null);
  const aceRulesProRef = useRef(null);
  const [reqData,setReqData] = useState(state.setupDetails);
  const [gradleConfig, setGradleConfig] = useState("loading...");
  const [gradleProperties, setGradleProperties] = useState("loading...");
  const [rulesPro, setRulesPro] = useState("loading...");
  const history = useHistory();
  const onSubmit = data => {
    action(data);
    history.push("/");
  };
  const [chipData, setChipData] = useState([]);
  const fetchData = () =>{
    //console.log(data);
    axios.post('http://localhost:5000/submit_form',reqData)
    .then(async (response)=>{
        //await setResData(response.data)
        console.log(response.data)
        await setGradleConfig(response.data.gradleConfig)
        await setGradleProperties(response.data.gradleProperties)
        await setRulesPro(response.data.rulesPro)
        await setChipsData(response.data.hints)
        console.log(chipsData)
    });
  }
  const [chipsData, setChipsData] = React.useState([
    { key: "-keepclasseswithmembers", label: "Prevent matching classes and matching members from being renamed if the corresponding class contains all of the specified members." },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" }
  ]);
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
                    placeholder="Nothing to modify in project.gradle"
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
              <Grid item xs={24} sm={12} alignContent="flex-start" alignItems='flex-start'>
                <Typography>Hover on Rule tags to check description of each rule.</Typography>
                <Paper component="ul" className={classes.paper}>
                  {chipsData.map((data) => {
                    let icon;
                    return (
                      <li key={data.key}>
                        <Tooltip title={data.label}>
                          <Chip
                            icon={icon}
                            avatar={<Avatar>{data.key[1]}</Avatar>}
                            label="Primary clickable"
                            clickable
                            color="primary"
                            label={data.key}
                            className={classes.chip}
                          />
                        </Tooltip>
                      </li>
                    );
                  })}
                </Paper>
              </Grid>
              <Grid item xs={24} sm={12}>
                  <Button
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    variant="contained"
                    color="secondary"
                  >Start Over</Button>
              </Grid>
          </Grid>
        </Paper>
      </div>
    </Container>
  );
}
