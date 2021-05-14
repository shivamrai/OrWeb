import React, {useState} from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
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
import ChipInput from 'material-ui-chip-input';
import Chip from "@material-ui/core/Chip";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useForm, Controller} from "react-hook-form";
import {Link, useHistory} from "react-router-dom";
import {useStateMachine} from "little-state-machine";
import updateAction from './updateAction';
import {pink} from '@material-ui/core/colors';
import Switch from '@material-ui/core/Switch';

const useStyles = makeStyles((theme) => ({
    root: {
        flexWrap: 'wrap',
        flexGrow: 1,
        '& > *': {
            margin: theme.spacing(2),
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
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
    grid: {
        margin: theme.spacing(2),
    },
    button: {
        margin: theme.spacing(1),
    },
}));
const defaultValues = {
    PrintseedsStats: "yes",
    R8OutputCFG: "no",
    ShrinkedClassesStats: "no",
    RemoveCommonWarnings: "no",
    WebviewRule: "no",
    WarningChipInput: [],
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
const Diagnostics = (props) => {
    const classes = useStyles();
    const {state, action} = useStateMachine(updateAction);
    const [resData, setResData] = useState({"first": 1});
    const [stat,setStat] = useState(state.setupDetails.PrintseedsStats);
    const [reqData, setReqData] = useState(state.setupDetails);
    const {handleSubmit, errors, register, control, setValue} = useForm({
        defaultValues
    });
    const [gradleConfig, setGradleConfig] = useState("loading...");
    const [gradleProperties, setGradleProperties] = useState("loading...");
    const [rulesPro, setRulesPro] = useState("loading...");

     const handleChange = (e) =>  {
        //create an object
         let newsetupDetails;

        if(e.target.checked === true){
            console.log("1st block")
            console.log(state.setupDetails.PrintseedsStats);
            setStat("yes");
            newsetupDetails =  {
                ...state.setupDetails,
                PrintseedsStats: "yes"
            };
            setValue('PrintseedsStats', "no");

            console.log(state.setupDetails.PrintseedsStats);

        }
        else{
            console.log("2nd block")
            console.log(state.setupDetails.PrintseedsStats);
            setStat("no");
            newsetupDetails =  {
                ...state.setupDetails,
                PrintseedsStats: "no"
            };
            setValue('PrintseedsStats', "yes");
            console.log(state.setupDetails.PrintseedsStats);

        }


        console.log("New Setup ");
        console.log(newsetupDetails);
        //setupDetails[name] = stat;
        //console.log(stat);
        //console.log(e.target.checked);
        //console.log(name);
        //updateStat(!!e.target.checked);

       // console.log(state.setupDetails)
        // let respChecked = "no";
        // if (e.target.checked === true){
        //     respChecked = "yes";
        // }
        //setValue(name, [...state.setupDetails.name, respChecked])

        //const updatedSetupDetails = Object.assign(state.setupDetails, {PrintseedsStats : stat});
        let ret = {
            ...state,
            setupDetails: newsetupDetails
            };

        console.log(ret);
        return ret;
        // console.log(state.setupDetails.PrintseedsStats);
        // console.log(stat);
        // if (e.target.checked === true) {
        //     return updateFormData({
        //         ...this.state.setupDetails,
        //         [e.target.name]: e.target.checked
        //     });
        // }
        // updateFormData({
        //     ...formData,
        //     // Trimming any whitespace
        //     [e.target.name]: e.target.value
        // });
    };
    React.useEffect(() => {
        console.log("changed to:" + stat);
        console.log(state.setupDetails.PrintseedsStats)
        console.log(state)
    }, [state.setupDetails.PrintseedsStats]);

    const history = useHistory();
    const onSubmit = data => {
        console.log("Data")
        console.log(data)
        action(data);
        history.push("/result");
    };

    const onBack = data => {
        //action(data);
        history.push("/annotationsAndPackages");
    };



    return (
        <Container component="main" maxWidth="md" fixed={true}>
            <CssBaseline/>
            <Paper elevation={1}>
                <Grid container spacing={2}>
                    <Grid item xs={12} container justify="center">
                        <Typography variant="h5">Part 4 Print Diagnostics Setup</Typography>
                    </Grid>
                    <Grid item xs={12} container justify="center" className={classes.grid}>
                        <Typography>This section specifies the rules that enable tracing issues through stdout. You can
                            later on add a filename in front of this rules(printseeds, printconfiguration, printusage )
                            generated on this page to output to a file.</Typography>
                    </Grid>
                    <Grid item xs={12} alignContent="flex-start" alignItems='flex-start'>
                        <form onSubmit={handleSubmit} class={classes.form}>
                            <section className={classes.section}>
                                <Typography>Do you want to suppress{" "}
                                    <ObfuscationTooltip
                                        title={
                                            <React.Fragment>
                                                <Typography color="inherit">Warning Exceptions</Typography>
                                                {"Specify class/interface/enum for which no warning messages would be printed, these could be about unresolved references and other important problems.For warnings about missing third-party classes, the options -ignorewarnings or -dontwarn are probably fine. If the code already works in debug mode, it means that the listed missing classes are never used. You can then tell R8 to proceed processing the code anyway."}
                                            </React.Fragment>
                                        }
                                    >
                                        <Link>warnings</Link>
                                    </ObfuscationTooltip>
                                    {" "}for some classes/libraries/packages?</Typography>
                                <Typography>Add those packages below in format <i>"com.devnn"</i> in below Text Field
                                    (case sensitive)</Typography>
                                <Controller as={
                                    <ChipInput
                                        aria-label="warningChipInput"
                                        value={defaultValues}
                                        control={<Chip/>}
                                        label="Add Library Packages here"
                                    />
                                }
                                            name="WarningChipInput"
                                            control={control}
                                            ref={register}
                                />
                                <p>R8 wouldm't print warnings about classes with matching names which are entered here.
                                    Ignoring warnings can be dangerous. <a
                                        href="https://www.guardsquare.com/en/products/proguard/manual/usage#dontwarn">Read
                                        More on Proguard Documentation</a></p>
                            </section>
                            <section className={classes.section}>
                                <Controller
                                    name="PrintseedsStats"
                                    control={control}
                                    render={(props) => {
                                        return (
                                            <Switch
                                                size="medium"
                                                id="printseedsStats"
                                                type="checkbox"
                                                name="PrintseedsStats"
                                                onChange={(e)=>(handleChange(e))}
                                                // inputRef={register}
                                                value={state.setupDetails.PrintseedsStats}
                                                checked={state.setupDetails.PrintseedsStats === "yes"}
                                                //checked={true}
                                            />
                                        );
                                    }}
                                />
                                <label>Enable display of all classes{" "}
                                    <ObfuscationTooltip
                                        title={
                                            <React.Fragment>
                                                <Typography color="inherit">List of whitelisted classes from
                                                    R8</Typography>
                                                {"Outputs a list of the classes, methods, and fields which match the keep rules to the console."}
                                            </React.Fragment>
                                        }
                                    >
                                        <Link>skipped</Link>
                                    </ObfuscationTooltip>{" "}during obfuscation.</label>
                            </section>
                            <section className={classes.section}>
                                <Controller
                                    as={
                                        <FormControlLabel
                                            control={<PurpleSwitch value="yes"/>}

                                            type="checkbox"
                                        />}
                                    name="R8OutputCFG"
                                    value={"no"}
                                    control={control}
                                    ref={register}
                                />
                                <label>Enable display of the final set of{" "}
                                    <ObfuscationTooltip
                                        title={
                                            <React.Fragment>
                                                <Typography color="inherit">All rules applied by R8</Typography>
                                                {"Outputs the used configuration rules to the console."}
                                            </React.Fragment>
                                        }
                                    >
                                        <Link>rules</Link>
                                    </ObfuscationTooltip>{" "}generated by R8 after build</label>
                            </section>
                            <section className={classes.section}>
                                <Controller
                                    as={
                                        <FormControlLabel
                                            control={<PurpleSwitch value="yes"/>}

                                            type="checkbox"
                                        />}
                                    name="ShrinkedClassesStats"
                                    value={"no"}
                                    control={control}
                                    ref={register}
                                />
                                <label>Enable display of classes which were{" "}
                                    <ObfuscationTooltip
                                        title={
                                            <React.Fragment>
                                                <Typography color="inherit">Removed Code</Typography>
                                                {"Outputs a list of the classes, methods, and fields which were removed during shrinking to the console."}
                                            </React.Fragment>
                                        }
                                    >
                                        <Link>removed</Link>
                                    </ObfuscationTooltip>{" "}during shrinking on console.</label>
                            </section>
                        </form>
                    </Grid>
                    <Grid item xs={6} sm={3} container justify="center">
                    </Grid>
                    <Grid item xs={6} sm={3} container justify="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="secondary"
                            fullWidth
                            onClick={handleSubmit(onBack)}
                        >Back
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={3} container justify="center">
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleSubmit(onSubmit)}
                        >Next
                        </Button>
                    </Grid>
                    <Grid item xs={6} sm={3} container justify="center">
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}
export default Diagnostics;
