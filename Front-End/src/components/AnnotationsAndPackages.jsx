import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
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
  PackagesChipInput: [],
  DescriptorChipInput:[],
};
let attributesArray = [];

export default function AnnotationsAndPackages() {
  const classes = useStyles();
  const {handleSubmit, errors, register, control} = useForm({
    defaultValues
  });
  const [defaultValue,setDefaultValue] = React.useState([]);
  const {state,action} = useStateMachine(updateAction);
  const history = useHistory();
  const onSubmit = data => {
    console.log(attributesArray);
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
                    <label>Do you want to keep some descriptor classes from obfuscation?</label>
                    <Typography>Add those classes in format <i>"class in.uncod.android.bypass.Document"</i> in below Text Field (case sensitive)</Typography>
                    <Controller as={
                      <ChipInput
                        aria-label="descriptorChipInput"
                        control={<Chip />}
                        label="Add Library Packages here"
                      />
                    }
                    name="DescriptorChipInput"
                    control={control}
                    ref={register}
                    />
                    <Typography>This is to make sure some specified field types, method return types and method parameter types are not renamed</Typography>
                  </section>
                  <section className={classes.section}>
                    <label>Do you want to suppress warnings for some classes/libraries/packages?</label>
                      <Typography>Add those packages below in format <i>"com.devnn"</i> in below Text Field (case sensitive)</Typography>
                      <Controller as={
                        <ChipInput
                          aria-label="packagesChipInput"
                          value={defaultValues}
                          control={<Chip />}
                          label="Add Library Packages here"
                        />
                        }
                        name="PackagesChipInput"
                        control={control}
                        ref={register}
                      />
                    <Typography>Some packages might break during obfuscation, those can be added to R8 whitelist.</Typography>
                  </section>
                  <section className={classes.action}>
                    <label>Do you want to keep below attributes? Check all that apply<br /></label>
                    {["Exceptions","InnerClasses","Signature","Deprecated","SourceFile","LineNumberTable","*Annotation*","EnclosingMethod"].map(name => (
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
