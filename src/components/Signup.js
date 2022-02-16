import React from 'react';
import {UseForm, Form} from './UseForm';
import Controls from './controls/Controls';
import { useAuth } from './context/AuthContext';
import UsersServices from '../services/UsersServices';
import { Avatar, Grid, Link, Paper, Typography } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';


const initialValues = {
    id: 0,
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    dOB: "",
    line_1: "",
    line_2: "",
    line_3: "",
    post_town: "",
    postcode: "",
    registerDate: new Date()
}


export default function Signup({handleChange}) {


    // Validation
    const validate = ( fieldValues = formData ) => {
        let temp = {...errors}
        if('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if('email' in fieldValues)
            temp.email = (/.+@.+..+/).test(fieldValues.email) ? "" : "Invalid email"
        if('phoneNumber' in fieldValues)
            temp.phoneNumber = fieldValues.phoneNumber.length>10 ? "" : "This number is too short"
        if('password' in fieldValues)
            temp.password = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/).test(fieldValues.password) ? "" : "Invalid password: 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
        if('confirmPassword' in fieldValues)
            temp.confirmPassword = formData.password===fieldValues.confirmPassword ? "" : "Passwords do not match"
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
            return Object.values(temp).every(x => x === "")
    }
    

    const { formData, errors, setErrors, handleInputChange } = UseForm(initialValues, true, validate);

    const { setCurrentUser, setLoggedIn, setLoading } = useAuth();
    
    async function handleSubmit(e) {
        setLoading(true)
        e.preventDefault()
        try {
            if (validate()) {
                const res = await UsersServices.createUser(formData)
                console.log(res)
                if (res && res.status < 300) {
                    setCurrentUser(res.data)
                    setLoggedIn(true)
                } else if (res && res.status === 409) {
                    setErrors(res.data.code === "email"
                    ?   { email: res.data.message }
                    :   { phoneNumber: res.data.message }
                    )
                }
            } else {
                return console.log("validation failed")
            }
        } catch(err){
            console.log(err)
        } finally {
            setLoading(false)
        }
    }


    return (
        <Grid>
            <Paper elevation={10} sx={{ p: 2.5, mb: 2.5 }}>
                <Grid align="center">
                    <Avatar sx={{ bgcolor: "#41a9e1" }}>
                        <AddBoxOutlinedIcon />
                    </Avatar>
                    <h2 style={{margin: 10}}>Rickshaw Registry</h2>
                    <h4 style={{margin: 10}}>Sign Up</h4>
                </Grid>

                <Form onSubmit={handleSubmit}>
                    <Controls.Input
                    name="name"
                    value={formData.name}
                    key="name"
                    onChange={handleInputChange}
                    error={errors.name}
                    fullWidth
                    autoFocus
                    />
                    <Controls.Input
                    name="email"
                    value={formData.email}
                    key="email"
                    onChange={handleInputChange}
                    error={errors.email}
                    fullWidth
                    />
                    <Controls.Input
                    name="phoneNumber"
                    label="Phone Number"
                    value={formData.phoneNumber}
                    key="phoneNumber"
                    type="tel"
                    onChange={handleInputChange}
                    error={errors.phoneNumber}
                    fullWidth
                    />
                    <Controls.Input
                    name="password"
                    value={formData.password}
                    key="password"
                    type="password"
                    onChange={handleInputChange}
                    error={errors.password}
                    fullWidth
                    />
                    <Controls.Input
                    name="confirmPassword"
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    key="confirmPassword"
                    type="password"
                    onChange={handleInputChange}
                    error={errors.confirmPassword}
                    fullWidth
                    />
                    <p style={{fontSize: 12}}>By signing up, you agree to our Terms. Learn how we collect, use and share your data in our Data Policy, and how we use cookies and similar technology in our Cookie Policy.</p>
                    
                    <Controls.Button
                    text="Create Account"
                    type="submit"
                    fullWidth
                    />
                </Form>
            </Paper>

            <Paper elevation={10} sx={{ p: 2.5, mb: 2.5 }}>
                <Typography align="center">
                    Have an account?
                    <Link href="#" onClick={()=>handleChange("open Log In event","0")} underline="none"> Log in </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}