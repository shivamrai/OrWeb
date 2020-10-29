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
    flexGrow: 1,
    '& > *': {
       margin: theme.spacing(5),
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
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  section :{
    margin: theme.spacing(1),
  },
  grid: {
    margin: theme.spacing(2),
  },
}));
const defaultValues = {

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

 const AnnotationsAndPackages = () => {
  const classes = useStyles();
  const {handleSubmit, errors, register, control} = useForm({
    defaultValues
  });
  const [defaultValue,setDefaultValue] = React.useState([]);
  const {state,action} = useStateMachine(updateAction);
  const history = useHistory();
  const onSubmit = data => {
    action(data);
    history.push("/diagnostics");
  };
  const onBack = data => {
    //action(data);
    history.push("/classAndDataExceptions");
  };
  return (
    <Container component="main" maxWidth="md" fixed={true}>
    <CssBaseline />
      <div className={classes.root}>
        <Paper elevation={1}>
          <Grid container spacing={2}>
              <Grid item xs={12} container justify="center">
                  <Typography variant="h5">Part 3 Annotations and Descriptor Class setup</Typography>
              </Grid>
              <Grid item xs={12} container justify="center" className={classes.grid}>
                  <Typography>This section builds rules to handle whitelisting of some more Java features in the Project which may cause issues while obfuscation. Adding some Interfaces and Attributes. </Typography>
              </Grid>
              <Grid item xs={24} sm={12} alignContent="flex-start" alignItems='flex-start'>
                <form onSubmit={handleSubmit(onSubmit)} class={classes.form}>
                  <section className={classes.section}>
                  <Typography>Do you want to keep some{" "}
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
                  {" "} from obfuscation?</Typography>
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

                    <p>Add those Interfaces in format <i>"class in.bypass or name of interface"</i> in above Text Field (case sensitive) Press enter to enter more.</p>
                    <Typography>This is to make sure some interfaces, either required in application or libraries are skipped from renaming.</Typography>
                  </section>
                  <section className={classes.section}>
                    <Typography>Do you want to keep below{" "}
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
                    {" "}? Check all that apply</Typography>
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
                      <p>You can select from above attributes which are being called in your project and they will be skipped from obfuscation. </p>
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
      </div>
    </Container>
  );
}
export default AnnotationsAndPackages;
