import React, { useState } from 'react';
import {UseForm, Form} from './UseForm';
import {FormInput} from './controls/FormInput'
import { useForm, Controller } from "react-hook-form";
import { Avatar, Button, Grid, Link, Paper, TextField, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const useStyles = makeStyles({
    root: {
        "&.css-14epxft-MuiPaper-root" :{ 
            padding: 20, 
            width: 280, 
            margin: "0 auto 20px" 
        },
        "&.css-2s90m6-MuiAvatar-root" :{ 
            backgroundColor: "#41a9e1" 
        },
        "&.css-wb57ya-MuiFormControl-root-MuiTextField-root" :{ 
            margin: "8px 0"
        },
        "&.css-1fu7jd5-MuiButtonBase-root-MuiButton-root" :{
            margin: "8px 0"
        }
        
    }
})

const initialValues = {
    id: 0,
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    termsAgreement: false
}

function Signup({handleChange}) {

    const classes = useStyles();


    // const paperStyle = { padding: 20, width: 280, margin: "0 auto 20px" };
    // const avatarStyle = { backgroundColor: "#41a9e1" };
    const headerStyle = { margin: 10 };
    // const marginStyle = { margin: "8px 0" };

    const {
        formData,
        setFormData,
        handleInputChange
    } = UseForm(initialValues);


    const findInputValue = e => Object.keys(formData).find( input=>input=== e);

    

    const handleCheckboxChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.checked
        });
    };

    const { handleSubmit, control } = useForm();

    console.log(formData.termsAgreement)

    return (
        <Grid>
            <Paper elevation={10} 
            className={classes.root}
            >
                <Grid align="center">
                    <Avatar 
                    className={classes.root}
                    >
                        <AddBoxOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Rickshaw Registry</h2>
                    <h4 style={headerStyle}>Sign Up</h4>
                </Grid>
                <Form>
                    <Grid>
                    {
                        FormInput.map(
                            input=> <TextField
                            {...input} 
                            className={classes.root}
                            value={formData[findInputValue(input.name)]} 
                            onChange={handleInputChange} 
                            variant="filled" 
                            size="small" 
                            fullWidth />)
                    }
                    </Grid>
                    <FormControlLabel control={<Checkbox name="termsAgreement" checked={formData.termsAgreement} onChange={handleCheckboxChange} />}  label="By signing up, you agree to our Terms." />
                    <Button onClick={handleSubmit} type="submit" color="primary" variant="contained" 
                    className={classes.root}
                     fullWidth>
                        Create Account
                    </Button>
                </Form>
            </Paper>
            <Paper elevation={10} 
            className={classes.root}
            >
                <Typography align="center">
                    Have an account?
                    <Link href="#" onClick={()=>handleChange("open Log In event",0)} underline="none"> Log in </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Signup;