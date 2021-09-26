import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Avatar, Button, Grid, Link, Paper, TextField, FormControlLabel, Checkbox, Typography } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import {FormInput} from './controls/FormInput'

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

    const paperStyle = { padding: 20, width: 280, margin: "0 auto 20px" };
    const avatarStyle = { backgroundColor: "#41a9e1" };
    const headerStyle = { margin: 10 };
    const marginStyle = { margin: "8px 0" };

    const [formData, setFormData] = useState(initialValues);

    const findInputValue = e => Object.keys(formData).find( input=>input=== e);

    const handleInputChange = e => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]:value
        });
    };

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
                        FormInput.map(
                            input=> <TextField
                            {...input} 
                            style={marginStyle} 
                            value={formData[findInputValue(input.name)]} 
                            onChange={handleInputChange} 
                            variant="filled" 
                            size="small" 
                            fullWidth />)
                    }
                    <FormControlLabel control={<Checkbox name="termsAgreement" checked={formData.termsAgreement} onChange={handleCheckboxChange} />}  label="By signing up, you agree to our Terms." />
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