import React from 'react';
import {UseForm, Form} from './UseForm';
import Controls from './controls/Controls';
import {FormInputItems} from './items/FormInputItems';
// import UsersServices from '../services/UsersServices';
import { Avatar, Grid, Link, Paper,Typography } from '@mui/material';
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
    showPassword: false,
    rememberMe: true
}


export default function Login({handleChange}) {

    // const [users, setUsers] = useState([]);

    // const getUsers = () => {
    //     UsersServices.getAllUsers()
    // }

    const classes = useStyles();

    // Validation
    const validate = ( fieldValues = formData) => {
        let temp = {...errors}
        if('email' in fieldValues)
            temp.email = (/.+@.+..+/).test(fieldValues.email)?"":"Invalid email"
        if('password' in fieldValues)
            temp.password = (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/).test(fieldValues.password)?"":"Invalid password: 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
            return Object.values(temp).every(x => x === "")
    }

    const { formData, errors, setErrors, handleInputChange } = UseForm(initialValues, true, validate);

    // const { handleSubmit, control } = useForm();

    const handleSubmit = (e) => {
        e.preventDefault()
        if(validate())
        window.alert('validation passed')
        else
        window.alert('not valid entry')
    }

    // console.log(formData.email)

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
                <Form onSubmit={handleSubmit}>
                    <Controls.Input 
                    {...FormInputItems.find(({name}) => name === "email")}
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    autoFocus
                    />
                    <Controls.Input 
                    {...FormInputItems.find(({name}) => name === "password")}
                    value={formData.password}
                    onChange={handleInputChange}
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