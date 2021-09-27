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

    const {name, label, value, type, onChange, error=null, ...other} = props;


    return(
        <TextField
            className={classes.root}
            name={name}
            label={label}
            value={value} 
            type={type || "text"}
            onChange={onChange}
            {...(error && {error:true, helperText:error})}
            {...other}
            variant="filled" 
            size="small" 
            fullWidth 
        />
    )
}