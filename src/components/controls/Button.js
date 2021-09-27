import React from 'react';
import { Button as MuiButton } from '@mui/material'
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    root: {
        "&.css-1fu7jd5-MuiButtonBase-root-MuiButton-root" :{ 
            margin: "8px 0"
        }
    }
})


export default function Button(props) {

    const classes = useStyles();
    
    const {text, size, color, variant, onClick, ...other} = props

    return(
        <MuiButton
        className={classes.root}
        size={size || "normal"}
        color={color || "primary"}
        variant={variant || "contained"}
        onClick={onClick}
        {...other}>
            {text}
        </MuiButton>
    )
}