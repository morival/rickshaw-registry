import React from 'react';
import { Button as MuiButton } from '@mui/material'


export default function Button(props) {
    
    const {text, size, color, variant, onClick, ...other} = props

    return(
        <MuiButton
        sx={{ my: 1 }}
        size={size || "normal"}
        color={color || "primary"}
        variant={variant || "contained"}
        onClick={onClick}
        {...other}>
            {text}
        </MuiButton>
    )
}