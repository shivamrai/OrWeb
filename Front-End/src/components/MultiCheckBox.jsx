import React from 'react';
import {FormControlLabel, Checkbox} from '@material-ui/core';

const MultiCheckBox = ({
                           name,
                           value,
                           register,
                           control,
                           setValue,
                           getValues,
                           defaultValue
                       }) => {
    return (
        <FormControlLabel
            control={<Checkbox defaultChecked={defaultValue}/>}
            name={name}
            inputRef={register}
            value={value}
            label={`${value}`}
        />
    );
};

export default MultiCheckBox;