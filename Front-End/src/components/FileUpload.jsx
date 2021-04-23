import React, {useContext} from 'react';
import { useForm } from "react-hook-form";
import {Paper,Button} from '@material-ui/core';
import {useStateMachine} from "little-state-machine";
import updateAction from './updateAction';
import axios from 'axios';
import PreFillReducer from './PreFillReducer';
import {GlobalContext} from './GlobalState';


const FileUpload = () => {
  const {register, handleSubmit} = useForm();
  const {state,action} = useStateMachine(updateAction);
  const [file,setFile] = React.useState(null);
  const [appState,dispatch] = useContext(GlobalContext);

  //const addAction = GlobalState(addsetupDetails);
  console.log(GlobalContext)
  async function uploadFile(file){
     console.log(file.file[0])
     const formData = new FormData();
     formData.append('file',file.file[0]);
     console.log(formData);
     await axios.post('http://ec2-18-221-156-6.us-east-2.compute.amazonaws.com:5000/upload', formData,{
         headers: {
             'content-type': 'multipart/form-data'
         }
     }).then(async (response) => {
            console.log(response.data)
            //setAppState(response.data);
            const res  = await action(response.data);
            console.log('res', res);
            console.log(state);
            await dispatch({
              type: 'ADD_DATA',
              payload: state
            });
            console.log(appState);
            //const result = await addAction(res);
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


    const onSubmit = (data) => {
      uploadFile(data);
    //  console.log(appState);
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
