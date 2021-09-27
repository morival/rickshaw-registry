import React, { useState } from 'react';
import {UseForm, Form} from './UseForm';
import {FormInputItems} from './items/FormInputItems';
import Controls from './controls/Controls';
import { useForm, Controller } from "react-hook-form";
import { Avatar, Grid, Link, Paper, Typography } from '@mui/material';
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
    registerDate: new Date(),
    termsAgreement: false
}


export default function Signup({handleChange}) {

    const classes = useStyles();

    const { formData, setFormData, handleInputChange } = UseForm(initialValues);

    // dynamically read the values from formData
    const findInputValue = e => Object.keys(formData).find( input=>input=== e);


    const { handleSubmit, control } = useForm();

    console.log(formData.registerDate)


    return (
        <Grid>
            <Paper elevation={10} 
            className={classes.root}
            >
                <Grid align="center">
                    <Avatar className={classes.root}>
                        <AddBoxOutlinedIcon />
                    </Avatar>
                    <h2 style={{margin: 10}}>Rickshaw Registry</h2>
                    <h4 style={{margin: 10}}>Sign Up</h4>
                </Grid>
                <Form>
                    {
                        FormInputItems.map(
                            input=> <Controls.Input
                                    {...input} 
                                    value={formData[findInputValue(input.name)]} 
                                    onChange={handleInputChange}
                                    />
                        )
                    }
                    <Controls.Checkbox
                    name="termsAgreement"
                    label="By signing up, you agree to our Terms."
                    value={formData.termsAgreement}
                    onChange={handleInputChange}
                    />
                    <Controls.Button
                    text="Create Account"
                    type="submit"
                    fullWidth
                    />
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