import React from 'react';
import {UseForm, Form} from './UseForm';
import Controls from './controls/Controls';
import Content from './content/ProfileDescriptions';
import { useAuth } from './context/AuthContext';
import { Avatar, Grid, Link, Paper, Typography } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';


const assignedValues = () => {
    const newObject = {};
    Content.profileDetails.forEach(detail => {
        newObject[detail.name] = "";
    })
    newObject["registerDate"] = new Date();
    return newObject
}
const initialValues = assignedValues()


export default function Signup({handleChange}) {


    // Validation
    const validate = ( fieldValues = formData ) => {
        let temp = {...errors}
        if('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "Field required"
        if('email' in fieldValues)
            temp.email = (/.+@.+..+/).test(fieldValues.email) ? "" : "Invalid email"
        if('phoneNumber' in fieldValues)
            temp.phoneNumber = fieldValues.phoneNumber.length>10 ? "" : "The number is too short"
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
    
    
    // Forms
    const { formData, errors, setErrors, handleInputChange } = UseForm(initialValues, true, validate);
    // Auth Context
    const { setLoading, createUser, login } = useAuth();
    

    async function handleSubmit(e) {
        setLoading(true)
        e.preventDefault()
        try {
            if (validate()) {
                const res = await createUser(formData)
                console.log(res)
                if (res && res.status < 300) {
                    login(res.data)
                } else if (res && res.status === 409) {
                    setErrors(res.data.code === "email"
                    ?   { email: res.data.message }
                    :   { phoneNumber: res.data.message }
                    )
                }
            } else {
                return console.log("validation failed")
            }
        } catch (err){
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
                        <AddBoxOutlinedIcon />
                    </Avatar>
                    <Typography variant='h5' gutterBottom>Rickshaw Registry</Typography>
                    <Typography variant='h6' gutterBottom>Sign Up</Typography>
                </Grid>

                <Form onSubmit={handleSubmit}>
                    {Content.profileDetails
                    .filter(element => (["name", "email", "phoneNumber", "password", "confirmPassword"]).includes(element.name))
                    .map((element, i) => {
                        const elementName = element.name;
                        return (
                            <Controls.Input
                                label={element.label}
                                name={elementName}
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
                    {/* {Content.signupContent.map((element, i) => {
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
                    })} */}
                    <Typography sx={{ fontSize: '0.75rem' }} paragraph>
                        By signing up, you agree to our Terms. Learn how we collect, use and share your data in our Data Policy, and how we use cookies and similar technology in our Cookie Policy.
                    </Typography>
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