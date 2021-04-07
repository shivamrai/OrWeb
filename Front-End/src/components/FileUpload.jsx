import React from 'react';
import { useForm } from "react-hook-form";
import {Paper,Button} from '@material-ui/core';
import {useStateMachine} from "little-state-machine";
import updateAction from './updateAction';
import axios from 'axios';


const FileUpload = () => {
  const {register, handleSubmit} = useForm();
  const {state,action} = useStateMachine(updateAction);
  const [appState, setAppState] = React.useState({state});
  const [file,setFile] = React.useState(null);

  async function uploadFile(file){
     console.log(file.file[0])
     const formData = new FormData();
     formData.append('file',file.file[0]);
     console.log(formData);
     await axios.post('http://localhost:5000/upload', formData,{
         headers: {
             'content-type': 'multipart/form-data'
         }
     }).then((response) => {
            console.log(response.data)
            setAppState(response.data);
            //setFile(response.data);
            //loader off
            // setLoading(false);
            // setSuccess(true);
            // SetNavigateNext(false);
            // setBtnText("Configuration Ready!");
            // console.log("success");
        }).catch((error) => {
            console.log("error",error)
     });
   }
   React.useEffect(() => {
       action(appState);
       console.log(state);
     },[appState]);



    const onSubmit = (data) => {
      uploadFile(data);
      console.log(appState);
      //console.log(jsonState);
    }

  return (
    <div>
    <Paper elevation={1}>
    <form onSubmit={handleSubmit(onSubmit)}>
        <input ref={register} type="file" name="file" />
        <button type="submit">Upload File</button>
      </form>
    </Paper>
    </div>
  );
}

export default FileUpload;
