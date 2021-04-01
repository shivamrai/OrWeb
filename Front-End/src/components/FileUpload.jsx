import React from 'react';
import { useForm } from "react-hook-form";
import {Paper,Button} from '@material-ui/core';


const FileUpload = () => {
  const {register, handleSubmit} = useForm();

  const onSubmit = data => {
    const storageRef = FileUpload.storage().ref();
    const fileRef = storageRef.child(data.upload[0].name);
    fileRef.put(data.upload[0]).then(()=>{
      console.log("Uploaded file");
    });
  }
  return (
    <div>
    <Paper elevation={1}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input ref={register} name="upload" type="file" />
        <button>Submit</button>
      </form>
    </Paper>
    </div>
  );
}

export default FileUpload;
