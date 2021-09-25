import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Avatar, Button, Grid, Link, Paper, TextField, FormControlLabel, Checkbox, Typography } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import {FormInput} from './controls/FormInput'

function Signup({handleChange}) {

    const paperStyle = { padding: 20, width: 280, margin: "0 auto 20px" };
    const avatarStyle = { backgroundColor: "#41a9e1" };
    const headerStyle = { margin: 10 };
    const marginStyle = { margin: "8px 0" };


    const { handleSubmit, control } = useForm();

    // const initialFormData = Object.freeze({
    //     email: ""
    //   });

    
    // const [formData, setFormData] = useState<string>(initialFormData);

    // function handleFormChange(e) {
    //     setFormData({
    //         ...formData,
    //         // Trimming any whitespace
    //         [e.target.name]: e.target.value.trim()
    //     });
    // };

    // const handleSubmit = () => {
    //     // e.preventDefault()
    //     console.log(formData);
    //     // ... submit to API or something
    //   };
    

    return (
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <Avatar style={avatarStyle}>
                        <AddBoxOutlinedIcon />
                    </Avatar>
                    <h2 style={headerStyle}>Rickshaw Registry</h2>
                    <h4 style={headerStyle}>Sign Up</h4>
                </Grid>
                <form>
                    {
                        FormInput.map(input=> <TextField {...input} style={marginStyle} variant="filled" size="small" fullWidth />)
                    }
                    <FormControlLabel control={<Checkbox />} label="By signing up, you agree to our Terms." />
                    <Button onClick={handleSubmit} type="submit" color="primary" variant="contained" style={marginStyle} fullWidth>
                        Create Account
                    </Button>
                </form>
            </Paper>
            <Paper elevation={10} style={paperStyle}>
                <Typography align="center">
                    Have an account?
                    <Link href="#" onClick={()=>handleChange("open Log In event",0)} underline="none"> Log in </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Signup;