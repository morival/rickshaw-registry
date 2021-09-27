import React, {useState} from 'react';
// import { makeStyles } from '@mui/styles';
// import {FormInput} from './controls/FormInput';
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


export function Form(props) {

    return(
        <form>
            {props.children}
        </form>
    )
}

