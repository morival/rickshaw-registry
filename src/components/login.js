import React from 'react';
import {UseForm, Form} from './UseForm';
import Controls from './controls/Controls';
// import {FormInputItems} from './items/FormInputItems';
import UsersServices from '../services/UsersServices';
import { Avatar, Grid, Link, Paper,Typography } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';


// const useStyles = makeStyles({
//     root: {
//         "&.css-14epxft-MuiPaper-root" :{ 
//             padding: 20, 
//             width: 280, 
//             margin: "0 auto 20px" 
//         },
//         "&.css-2s90m6-MuiAvatar-root" :{ 
//             backgroundColor: "#41a9e1" 
//         }
//     }
// })

const initialValues = {
    login: "",
    password: "",
    showPassword: false,
    rememberMe: true
}


export default function Login({handleChange}) {

    // const classes = useStyles();

    // Validation
    const validate = ( fieldValues = formData) => {
        let temp = {...errors}
        const testEmail = /.+@.+..+/;
        const testNumber = /^\d+.{10,20}$/;
        const testPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if('login' in fieldValues)
            temp.login = testEmail.test(fieldValues.login) || testNumber.test(fieldValues.login) ?"":"Invalid email or phone number"
        if('password' in fieldValues)
            temp.password = testPassword.test(fieldValues.password)?"":"Invalid password: 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
            return Object.values(temp).every(x => x === "")
    }

    const { formData, errors, setErrors, handleInputChange, handleClickShowPassword } = UseForm(initialValues, true, validate);

    const handleSubmit = (e) => {
        e.preventDefault()
        if (validate())
        onFormSubmit();
        // else
        // window.alert('not valid entry')
    }

    const onFormSubmit = () => {
        UsersServices.validateUser(
            {
                login: formData.login,
                password: formData.password
            }
        );
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
                    name="login"
                    value={formData.login}
                    key="login"
                    onChange={handleInputChange}
                    error={errors.login}
                    autoFocus
                    />
                    <Controls.Input
                    name="password"
                    value={formData.password}
                    key="password"
                    type="password"
                    onChange={handleInputChange}
                    onClick={handleClickShowPassword}
                    showPassword={formData.showPassword}
                    error={errors.password}
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
                    <Link href="#" 
                    // onClick={()=>getUsers()} 
                    underline="none">Forgotten your password?</Link>
                </Typography>
            </Paper>
            <Paper elevation={10} sx={{ p: 2.5, mb: 2.5 }}>
                <Typography align="center">
                    Don't have an account?
                    <Link href="#" onClick={()=>handleChange("open Sign Up event",1)} underline="none"> Sign up </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}