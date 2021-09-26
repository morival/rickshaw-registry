import React, {useState} from 'react'
// import { makeStyles } from '@mui/styles';
// import {FormInput} from './controls/FormInput'
// import { useForm, Controller } from "react-hook-form";
// import { Avatar, Button, Grid, Link, Paper, TextField, FormControlLabel, Checkbox, Typography } from '@mui/material';
// import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

export function UseForm(initialValues) {


    const [formData, setFormData] = useState(initialValues);

    const handleInputChange = e => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]:value
        });
    };
    

    return {
        formData,
        setFormData,
        handleInputChange

    }
}

// const useStyles = makeStyles({
//     root: {
//         "&.css-14epxft-MuiPaper-root" :{ 
//             padding: 20, 
//             width: 280, 
//             margin: "0 auto 20px" 
//         },
//         "&.css-2s90m6-MuiAvatar-root" :{ 
//             backgroundColor: "#41a9e1" 
//         },
//         "&.css-wb57ya-MuiFormControl-root-MuiTextField-root" :{ 
//             margin: "8px 0"
//         },
//         "&.css-1fu7jd5-MuiButtonBase-root-MuiButton-root" :{
//             margin: "8px 0"
//         }
        
//     }
// })

export function Form(props) {

    // const classes = useStyles();

    return(
        <form>
            {props.children}
        </form>
    )
}

