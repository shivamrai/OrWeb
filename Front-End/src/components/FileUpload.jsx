import React from 'react';
import {useForm} from 'react-hook-form';
import Paper from '@material-ui/core/Paper';


const fileUpload = () =>{
  const {register, handleSubmit} = useForm();

  const onSubmit = data => {
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(data.upload[0].name);
    fileRef.put(data.upload[0]).then(()=>{
      console.log("Uploaded file");
    });
  }
  return
  (
    <Paper elevation={1}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input ref={register} name="upload" type="file"  />
        <Button>Submit</Button>
      </form>
    </Paper>
  );
}

export default fileUpload;
