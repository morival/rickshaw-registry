import React from 'react';
import { FormControl, FormHelperText, FilledInput as MuiInput, InputLabel, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
// import { makeStyles } from '@mui/styles';


// const useStyles = makeStyles({
//     root: {
//         "&.css-q8hpuo-MuiFormControl-root" :{ 
//             margin: "8px 0"
//         }
//     }
// })


export default function Input(props) {

    // const classes = useStyles();

    const {name, label, value, type, onChange, variant, size, error=null, showPassword, onClick, ...other} = props;

    const checkInputType = () => {
         const inputType = type;
        if (inputType === "password") {
            if (showPassword) 
                return "text"
             else 
                return "password"
        } else if (inputType)
            return inputType
         else 
            return "text"
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

    return(
        <FormControl
        sx={{ my: 1 }}
        variant={variant || "filled"} 
        fullWidth
        >
            <InputLabel>{label || name[0].toUpperCase()+name.slice(1)}</InputLabel>
            <MuiInput
                name={name}
                value={value} 
                type={checkInputType()}
                onChange={onChange}
                size={size || "small"}
                {...(error && {error:true})}
                {...other}
                endAdornment={
                    type === "password"?
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={onClick}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                    : null
                }
            />
            <FormHelperText error>{error}</FormHelperText>
        </FormControl>
    )
}