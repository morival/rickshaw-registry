import React from 'react';
import {UseForm, Form} from './UseForm';
import Controls from './controls/Controls';
import { useAuth } from './context/AuthContext';
import { Avatar, Grid, Link, Paper,Typography } from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { useHistory } from 'react-router';


const initialValues = {
    userLogin: "",
    password: "",
    rememberMe: true
}


export default function Login({handleChange}) {


    // Validation
    const validate = ( fieldValues = formData) => {
        let temp = {...errors}
        const testEmail = /.+@.+..+/;
        const testNumber = /^\d+.{10,20}$/;
        const testPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if('userLogin' in fieldValues)
            temp.userLogin = testEmail.test(fieldValues.userLogin) || testNumber.test(fieldValues.userLogin) ?"":"Invalid email or phone number"
        if('password' in fieldValues)
            temp.password = testPassword.test(fieldValues.password)?"":"Invalid password: 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
            return Object.values(temp).every(x => x === "")
    }
    
    const { formData, errors, setErrors, handleInputChange } = UseForm(initialValues, true, validate);


    

    const history = useHistory();
    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault()
        if (!validate()) // true or false
            return console.log("validation failed")
        try {
            if (await login(formData)) {
                if (formData.rememberMe)
                localStorage.setItem('user', JSON.stringify(formData))
                history.push("/");
                console.log("remember me: "+formData.rememberMe)
            }
        } catch(err) {
            setErrors(err.mes)
        }
    }

    return (
        <Grid>
            <Paper elevation={10} sx={{ p: 2.5, mb: 2.5 }}>
                <Grid align="center">
                    <Avatar sx={{ bgcolor: "#41a9e1" }}>
                        <LockOpenOutlinedIcon />
                    </Avatar>
                    <h2 style={{margin: 10}}>Rickshaw Registry</h2>
                    <h4 style={{margin: 10}}>Log In</h4>
                </Grid>
                <Form onSubmit={handleSubmit}>
                    <Controls.Input
                    name="userLogin"
                    label="Email or Phone"
                    value={formData.userLogin}
                    key="userLogin"
                    onChange={handleInputChange}
                    error={errors.userLogin}
                    fullWidth
                    autoFocus
                    autoComplete="on"
                    />
                    <Controls.Input
                    name="password"
                    value={formData.password}
                    key="password"
                    type="password"
                    onChange={handleInputChange}
                    error={errors.password}
                    fullWidth
                    autoComplete="on"
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
                    // disabled={loading}
                    fullWidth
                    />
                </Form>
                <Typography align="center">
                    <Link href="#" 
                    underline="none">Forgotten your password?</Link>
                </Typography>
            </Paper>
            <Paper elevation={10} sx={{ p: 2.5, mb: 2.5 }}>
                <Typography align="center">
                    Don't have an account?
                    <Link href="#" onClick={()=>handleChange("open Sign Up event","1")} underline="none"> Sign up </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}