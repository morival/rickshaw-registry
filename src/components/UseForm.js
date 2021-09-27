import React, {useState} from 'react';
// import { makeStyles } from '@mui/styles';
// import {FormInput} from './controls/FormInput';
// import { useForm, Controller } from "react-hook-form";
// import { Avatar, Button, Grid, Link, Paper, TextField, FormControlLabel, Checkbox, Typography } from '@mui/material';
// import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

export function UseForm(initialValues, validateOnChange=false, validate) {


    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]:value
        });
        if(validateOnChange)
        validate({[name]: value})
    };
    
    return {
        formData,
        setFormData,
        errors,
        setErrors,
        handleInputChange

    }
}


export function Form(props) {

    const {children, ...other} = props;

    return(
        <form {...other}>
            {props.children}
        </form>
    )
}

