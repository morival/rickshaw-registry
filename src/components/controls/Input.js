import React, { useState } from 'react';
import { FormControl, FormHelperText, FilledInput as MuiInput, InputLabel, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';


export default function Input(props) {


    const { name, label, value, type, onChange, variant, size, fullWidth, autoComplete, error=null, onClick, ...other } = props;

    const checkInputType = () => {
        if (type === "password") {
            if (showPassword) 
                return "text"
            else 
                return "password"
        } else if (type)
            return type
        else 
            return "text"
    };

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword)
    };
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return(
        <FormControl
        sx={{ my: 1 }}
        variant={variant || "filled"}
        fullWidth={fullWidth || false}
        >
            <InputLabel>{label || name[0].toUpperCase()+name.slice(1)}</InputLabel>
            <MuiInput
                name={name}
                value={value} 
                type={checkInputType()}
                onChange={onChange}
                size={size || "small"}
                autoComplete={autoComplete || "off"}
                {...(error && {error:true})}
                {...other}
                endAdornment={type === "password"
                ?   <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                :   null
                } />
            <FormHelperText error>{error}</FormHelperText>
        </FormControl>
    )
}