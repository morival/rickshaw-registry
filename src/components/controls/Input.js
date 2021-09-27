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


export default function Input(props) {

    const classes = useStyles();

    const {name, label, value, type, onChange, ...other} = props;


    return(
        <TextField
            className={classes.root}
            name={name}
            label={label}
            value={value} 
            type={type || "text"}
            onChange={onChange}
            {...other}
            variant="filled" 
            size="small" 
            fullWidth 
        />
    )
}