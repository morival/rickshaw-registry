import React, {  } from 'react';
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';



export default function SelectInput(props) {
    

    const { name, label, menuItems, value, onChange, fullWidth, error=null, ...other } = props;

    const handleChange = (name, value) => ({
        target:{
            name, value
        }
    });

    return (
        <FormControl
        sx={{ my: 1 }}
        fullWidth={fullWidth || false}
        >
            <InputLabel id={name}>{label}</InputLabel>
            <Select
                label={label}
                labelId={name}
                id="select"
                value={value}
                onChange={e => onChange(handleChange(name, e.target.value))}
                {...(error && {error:true})}
                {...other}
            >
                {menuItems.map((element, i) => 
                    <MenuItem value={element} key={i}>{element}</MenuItem>
                )}
            </Select>
        </FormControl>
    )
};
