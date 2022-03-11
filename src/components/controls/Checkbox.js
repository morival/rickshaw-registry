import { FormControl, FormControlLabel, Checkbox as MuiCheckbox, Typography } from '@mui/material';
import React from 'react';


export default function Checkbox(props) {

    const {name, label, labelSX, color, value, onChange, sx, ...other} = props;

    const handleCheckboxChange = (name, value) => ({
        target:{
            name, value
        }
    });

    
    return(
        <FormControl
            sx={sx}
        >
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    // label={label || ""}
                    color={color || "primary"}
                    checked={value}
                    onChange={e=>onChange(handleCheckboxChange(name,e.target.checked))}
                    {...other}
                />}
                label={<Typography sx={labelSX}>{label}</Typography> || ""}
                sx={{ mr: 0 }}
                
            />
        </FormControl>
    )
};