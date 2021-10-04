import React from 'react';
import {UseForm, Form} from './UseForm';
import Controls from './controls/Controls';
import {FormInputItems} from './items/FormInputItems';
import UsersServices from '../services/UsersServices';
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
    showPassword: false,
    registerDate: new Date()
}


export default function Signup({handleChange}) {

    const classes = useStyles();

    // Validation
    const validate = ( fieldValues = formData) => {
        let temp = {...errors}
        if('name' in fieldValues)
            temp.name = fieldValues.name?"":"This field is required."
        if('email' in fieldValues)
            temp.email = (/.+@.+..+/).test(fieldValues.email)?"":"Invalid email"
        if('phoneNumber' in fieldValues)
            temp.phoneNumber = fieldValues.phoneNumber.length>10?"":"Too short number"
        if('password' in fieldValues)
            temp.password = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/).test(fieldValues.password)?"":"Invalid password: 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
        if('confirmPassword' in fieldValues)
            temp.confirmPassword = fieldValues.password===fieldValues.confirmPassword && fieldValues.confirmPassword.length>5?"":"Passwords don't match."
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
            return Object.values(temp).every(x => x === "")
    }
    

    const { formData, errors, setErrors, handleInputChange } = UseForm(initialValues, true, validate);


    // dynamically read the values from formData
    const findInputValue = e => Object.keys(formData).find( input=>input=== e);
    // dynamically read the errors from temp
    const findErrorValue = e => Object.keys(errors).find( input=>input=== e);

    
    const handleSubmit = (e) => {
        e.preventDefault()
        if(validate())
        onFormSubmit();
        else
        window.alert('not valid entry')
    }

    const onFormSubmit = () => {
        UsersServices.createUser(
            {
                name: formData.name,
                email: formData.email,
                phoneNumber: formData.phoneNumber,
                password: formData.password,
                registerDate: formData.registerDate
            }
        );
    }


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
                <Form onSubmit={handleSubmit}>
                    {/* {
                        FormInputItems.map( (input, index)=> {
                            return input.type !== 'password'?
                            <Controls.Input key={index}
                                {...input} 
                                value={formData[findInputValue(input.name)]}
                                onChange={handleInputChange}
                                error={errors[findErrorValue(input.name)]}
                            />
                            :<FormControl fullWidth key={index}>
                                <InputLabel key={index} htmlFor={input.label}>{input.label}</InputLabel>
                                <Controls.Input key={index}
                                {...input} 
                                value={formData[findInputValue(input.name)]}
                                type={formData.showPassword ? 'text' : 'password'}
                                onChange={handleInputChange}
                                error={errors[findErrorValue(input.name)]}
                                />
                            </FormControl>
                        })
                    } */}
                    {
                        FormInputItems.map(
                            input=> <Controls.Input
                                    {...input} 
                                    value={formData[findInputValue(input.name)]}
                                    onChange={handleInputChange}
                                    error={errors[findErrorValue(input.name)]}
                                    />
                        )
                    }
                    <p style={{fontSize: 12}}>By signing up, you agree to our Terms. Learn how we collect, use and share your data in our Data Policy, and how we use cookies and similar technology in our Cookie Policy.</p>
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