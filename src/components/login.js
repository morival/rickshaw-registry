import React, { useState } from 'react';
import { Form, UseForm } from './UseForm';
import Controls from './controls/Controls';
import { useForm, Controller } from "react-hook-form";
import { Avatar, Button, Grid, Link, Paper, TextField, FormControlLabel, Checkbox, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';


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
    email: "",
    password: "",
    rememberMe: true
}


export default function Login({handleChange}) {

    const classes = useStyles();

    const { formData, setFormData, handleInputChange } = UseForm(initialValues);

    const { handleSubmit, control } = useForm();

    return (
        <Grid>
            <Paper elevation={10} 
            className={classes.root}
            >
                <Grid align="center">
                    <Avatar className={classes.root}>
                        <LockOpenOutlinedIcon />
                    </Avatar>
                    <h2 style={{margin: 10}}>Rickshaw Registry</h2>
                    <h4 style={{margin: 10}}>Log In</h4>
                </Grid>
                <Form>
                    <Controls.Input 
                    name="email"
                    label="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    autoFocus
                    />
                    <Controls.Input 
                    name="password"
                    label="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    type="password"
                    />
                    <Controls.Checkbox
                    name="rememberMe"
                    label="Remember me"
                    value={formData.rememberMe}
                    onChange={handleInputChange}
                    />
                    <Controls.Button
                    text="Log In"
                    type="submit"
                    fullWidth
                    />
                </Form>
                <Typography align="center">
                    <Link href="#" underline="none">Forgotten your password?</Link>
                </Typography>
            </Paper>
            <Paper elevation={10} 
            className={classes.root}
            >
                <Typography align="center">
                    Don't have an account?
                    <Link href="#" onClick={()=>handleChange("open Sign Up event",1)} underline="none"> Sign up </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}