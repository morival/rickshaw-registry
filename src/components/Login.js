import React from 'react';
import {UseForm, Form} from './UseForm';
import Controls from './controls/Controls';
import Content from './content/SignupLoginDescriptions';
import { useAuth } from './context/AuthContext';
import UsersServices from '../services/UsersServices';
import { Avatar, Grid, Link, Paper,Typography } from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
// import { useHistory } from 'react-router';


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
    
    const { formData, errors, setErrors, handleInputChange } = UseForm(initialValues, true, validate);


    // const history = useHistory();
    const { setCurrentUser, setLoggedIn, setLoading } = useAuth();


    // Login Components
    // const loginComponents = () =>

    async function handleSubmit(e) {
        setLoading(true)
        e.preventDefault()
        try {
            if (validate()) {
                const auth = await UsersServices.authenticateUser(formData)
                console.log(auth)
                if (auth && auth.status < 300) {
                    const res = await UsersServices.getUser(auth.data.id)
                    setCurrentUser(res.data)
                    setLoggedIn(true)
                    console.log("remember me: "+formData.rememberMe)
                } else if (auth && auth.status === 404) {
                    setErrors({ userLogin: auth.data.message })
                } else if (auth && auth.status === 401) {
                    setErrors({ password: auth.data.message })
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
                    {Content.loginContent.map((element, i) => {
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
                <Typography align="center">
                    <Link href="#" underline="none">Forgotten your password?</Link>
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