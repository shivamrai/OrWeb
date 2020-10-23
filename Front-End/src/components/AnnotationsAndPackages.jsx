import React from 'react';
import { makeStyles , withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
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
import {Link, useHistory} from "react-router-dom";
import {useStateMachine} from "little-state-machine";
import updateAction from './updateAction';

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
    width: '100%',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,

  },
}));
const defaultValues = {
  WarningChipInput: [],
  InterfaceChipInput:[],
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

export default function AnnotationsAndPackages() {
  const classes = useStyles();
  const {handleSubmit, errors, register, control} = useForm({
    defaultValues
  });
  const [defaultValue,setDefaultValue] = React.useState([]);
  const {state,action} = useStateMachine(updateAction);
  const history = useHistory();
  const onSubmit = data => {
    //console.log(attributesArray);
    action(data);
    history.push("/diagnostics");
  };

  return (
    <Container component="main" maxWidth="md" fixed={true}>
    <CssBaseline />
      <div className={classes.root}>
        <Paper elevation={1}>
          <Grid container spacing={2}>
              <Grid item xs={24} sm={12}>
                  <Typography variant="h5">Part 3 Annotations and Descriptor Class setup</Typography>
              </Grid>
              <Grid item xs={24} sm={12} alignContent="flex-start" alignItems='flex-start'>
                <form onSubmit={handleSubmit(onSubmit)} class={classes.form}>
                  <section className={classes.section}>
                    <label>Do you want to keep some{" "}
                    <ObfuscationTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Interface Exceptions</Typography>
                          {"Specify interface and interface members (fields and methods) to be preserved as entry points to your code. In order to process a library, you should specify all publicly accessible interfaces."}
                        </React.Fragment>
                      }
                    >
                      <Link>interfaces</Link>
                    </ObfuscationTooltip>
                    {" "} from obfuscation?</label>
                    <Typography>Add those Interfaces in format <i>"class in.bypass or name of interface"</i> in below Text Field (case sensitive).</Typography>
                    <Controller as={
                      <ChipInput
                        aria-label="interfaceChipInput"
                        control={<Chip />}
                        label="Add Interface names here"
                      />
                    }
                    name="InterfaceChipInput"
                    control={control}
                    ref={register}
                    />
                    <Typography>This is to make sure some interfaces, either required in application or libraries are skipped from renaming.</Typography>
                  </section>
                  <section className={classes.section}>
                    <label>Do you want to suppress{" "}
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
                     {" "}for some classes/libraries/packages?</label>
                      <Typography>Add those packages below in format <i>"com.devnn"</i> in below Text Field (case sensitive)</Typography>
                      <Controller as={
                        <ChipInput
                          aria-label="warningChipInput"
                          value={defaultValues}
                          control={<Chip />}
                          label="Add Library Packages here"
                        />
                        }
                        name="WarningChipInput"
                        control={control}
                        ref={register}
                      />
                    <Typography>R8 wouldm't print warnings about classes with matching names which are entered here. Ignoring warnings can be dangerous. <a href="https://www.guardsquare.com/en/products/proguard/manual/usage#dontwarn">Read More on Proguard Documentation</a></Typography>
                  </section>
                  <section className={classes.action}>
                    <label>Do you want to keep below{" "}
                    <ObfuscationTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Java Lang Attributes</Typography>
                          {"Class files essentially define classes, their fields, and their methods. A lot of essential and non-essential data are attached to these classes, fields, and methods as attributes. For instance, attributes can contain bytecode, source file names, line number tables, etc. R8's obfuscation step removes attributes that are generally not necessary for executing the code."}
                        </React.Fragment>
                      }
                    >
                      <Link>attributes</Link>
                    </ObfuscationTooltip>
                    {" "}? Check all that apply<br /></label>
                    {["Exceptions","InnerClasses","Signature","Deprecated","SourceFile","LineNumberTable","*Annotation*","EnclosingMethod","Synthetic","MethodParameters"].map(name => (
                      <Controller
                        key={name}
                        name={name}
                        as={
                          <FormControlLabel
                            control={<Checkbox value={name} />}
                            label={name}
                          />
                        }
                        valueName={defaultValues.Attributes}
                        type="checkbox"
                        onChange={([e]) => {
                            return e.target.checked ? e.target.value : "";
                          }
                        }
                        control={control}
                        ref={register}
                      />
                      ))}
                      <Typography>You can select from above attributes which are being called in your project and they will be skipped from obfuscation. </Typography>
                  </section>
                </form>
              </Grid>
              <Grid item xs={24} sm={12}>
                <Link to="/classAndDataExceptions">
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
