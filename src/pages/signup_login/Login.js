import React from 'react';
import { Avatar, Grid, Link, Paper,Typography } from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import ForgotPassword from './ForgotPassword';
import {UseForm, Form} from 'components/UseForm';
import Controls from 'components/controls/Controls';
import { useAuth } from 'context/AuthContext';


const loginContent = [
    { label: "Email or Phone", name: "userLogin" },
    { name: "password", type: "password" }
]

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
            temp.userLogin = testEmail.test(fieldValues.userLogin) || testNumber.test(fieldValues.userLogin) ? "" : "Invalid email or phone number"
        if('password' in fieldValues)
            temp.password = testPassword.test(fieldValues.password) ? "" : "Invalid password: 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
        if('authentification' in fieldValues)
            temp.authentification = fieldValues.authentification ? fieldValues.authentification : ""
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
            return Object.values(temp).every(x => x === "")
    }
    
    // Forms
    const { formData, errors, setErrors, handleInputChange } = UseForm(initialValues, true, validate);
    // Auth Context
    const { setLoading, authenticate, getUser, login } = useAuth();


    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            // validate entry
            if (validate()) {
                const auth = await authenticate(formData)
                console.log(auth)
                if (auth && auth.status < 300) {
                    const res = await getUser(auth.data)
                    console.log(res)
                    login(res.data)
                } else {
                    setErrors(auth.data)
                }
            }
        } catch(err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Grid>
            <Paper elevation={10} sx={{ p: 2.5, mb: 2.5 }}>
                <Grid align="center">
                    <Avatar sx={{ bgcolor: "#41a9e1", mb: 1 }}>
                        <LockOpenOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5' gutterBottom>Rickshaw Registry</Typography>
                    <Typography variant='h6' gutterBottom>Log In</Typography>
                </Grid>

                <Form onSubmit={handleSubmit}>
                    {loginContent.map((element, i) => {
                        const elementName = element.name;
                        return (
                            <Controls.Input
                            label={element.label}
                            name={element.name}
                            type={element.type}
                            value={formData[elementName]}
                            error={errors[elementName]}
                            onChange={handleInputChange}
                            fullWidth
                            autoComplete="on"
                            autoFocus={i === 0 ? true : false}
                            key={i}
                            />
                        )
                    })}
                    <Controls.Checkbox
                    label="Remember me"
                    name="rememberMe"
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
                <ForgotPassword />
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