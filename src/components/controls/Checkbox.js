import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';
import React from 'react';


export default function Checkbox(props) {

    const {name, label, value, onChange} = props;

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
                    label={label}
                    checked={value}
                    onChange={e=>onChange(handleCheckboxChange(name,e.target.checked))}
                    color="primary"
                />}
                label={label}
            />
        </FormControl>
    )
}