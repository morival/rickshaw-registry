import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';
import React from 'react';


export default function Checkbox(props) {

    const {name, label, color, value, onChange, ...other} = props;

    const handleCheckboxChange = (name, value) => ({
        target:{
            name, value
        }
    });

    
    return(
        <FormControl>
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    label={label || ""}
                    color={color || "primary"}
                    checked={value}
                    onChange={e=>onChange(handleCheckboxChange(name,e.target.checked))}
                    {...other}
                />}
                label={label || ""}
            />
        </FormControl>
    )
};