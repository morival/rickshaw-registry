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

    const {name, label, value, type, onChange, variant, size, error=null, ...other} = props;

    return(
        <TextField
            className={classes.root}
            name={name}
            label={label || name[0].toUpperCase()+name.slice(1)}
            value={value} 
            type={type || "text"}
            onChange={onChange}
            variant={variant || "filled"} 
            size={size || "small"}
            {...(error && {error:true, helperText:error})}
            {...other}
            fullWidth 
        />
    )
}