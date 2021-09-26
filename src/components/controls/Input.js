import React from 'react';
import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        "&.css-wb57ya-MuiFormControl-root-MuiTextField-root" :{ 
            margin: "8px 0"
        }
    }
})

export function Input(props) {
    

    const classes = useStyles();

    const {name, label, value, type, onChange, autoFocus} = props;


    return(
        <TextField
            // {...input} 
            className={classes.root}
            name={name}
            label={label}
            value={value} 
            type={type}
            onChange={onChange}
            autoFocus={autoFocus}
            variant="filled" 
            size="small" 
            fullWidth 
        />
    )
}

export default Input;