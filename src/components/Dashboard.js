import React, { useState, useRef } from 'react';
import { useAuth } from './context/AuthContext';
import UsersServices from '../services/UsersServices';
import {UseForm} from './UseForm';
import Controls from './controls/Controls';
import { List, Paper, Tab } from '@mui/material';
import { Box } from '@mui/system';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Link } from 'react-router-dom';
// import DashboardItem from './controls/DashboardItem';


export default function Dashboard({ children, ...rest }) {

    const validate = (  fieldValues = formData ) => {
        let temp = {...errors}
        const testEmail = /.+@.+..+/;
        const testNumber = /^\d+.{10,20}$/;
        // const testPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "This field is required."
        if('dOB' in fieldValues)
            temp.dOB = fieldValues.dOB ? "" : "This field is required."
        if('email' in fieldValues)
            temp.email = testEmail.test(fieldValues.email) ? "" : "Invalid email"
        if('phoneNumber' in fieldValues)
            temp.phoneNumber = testNumber.test(fieldValues.phoneNumber) ? "" : "This number is too short"
        // if('password' in fieldValues)
        //     temp.password = testPassword.test(fieldValues.password) ? "" : "Invalid password: 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
            return Object.values(temp).every(x => x === "")
    }
 
    
    const { currentUser, setCurrentUser } = useAuth()

    const { formData, errors, setErrors, handleInputChange } = UseForm(currentUser, true, validate)

    
    const [panel, setPanel] = useState("0");

    const [passwordVerification, setPasswordVerification] = useState({password:""});

    const handlePassChange = (e) => {
        setPasswordVerification({password: e.target.value});
    }


    const ref = useRef(null);

    const handleChange = (event, newValue) => {
        setPanel(newValue);
    };

    const itemsList = [{
        name: "name",
        label: "Name",
        value: formData.name,
        error: errors.name,
        info: "basic"
    }, {
        name: "address",
        label: "Address",
        value: formData.address,
        error: errors.address,
        info: "basic"
    }, {
        name: "dOB",
        label: "Date of birth",
        value: formData.dOB,
        error: errors.dOB,
        info: "basic"
    }, {
        name: "email",
        label: "Email",
        value: formData.email,
        error: errors.email,
        info: "security"
    }, {
        name: "phoneNumber",
        label: "Phone number",
        value: formData.phoneNumber,
        error: errors.phoneNumber,
        info: "security"
    }, {
        name: "password",
        label: "Password",
        value: formData.password,
        error: errors.password,
        info: "security"
    }]

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (!passwordVerification.password) {
                console.log("password verification required")
                ref.current.handleOpen();
            } else {
                if (!validate()) {
                    return console.log("validation failed")
                } else {
                    console.log("password verification passed")
                    const user = { _id: currentUser._id, password: passwordVerification.password }
                    const authPassword = await UsersServices.authenticateUser(user)
                    console.log(authPassword.status)
                    console.log(formData)
                    const res = await UsersServices.updateUser(formData)
                    console.log(res)
                    if (res && res.status < 300) {
                        setCurrentUser(res.data)
                    } else if (res && res.status === 409) {
                        setErrors(res.data.code === "email"
                        ?   { email: res.data.message }
                        :   { phoneNumber: res.data.message }
                        )
                    }
                }
            }
        } catch(err) {
            if(err.response){
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
              } else {
                console.log(`Error: ${err.message}`)
              }
        }
    }

    return (
        <Box sx={{ p: 2 }}>
            <h1>Dashboard</h1>
            <Controls.Button
            text="Home"
            size="small"
            color="success"
            component={Link} to={"/"}
            />
            <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <Paper sx={{ p: 1, maxWidth: '800px', width: '100%' }}>
                <Box sx={{ display: 'flex' }}>
                    <TabContext value={panel}>
                        {/* <Paper> */}
                                <TabList 
                                value={panel} 
                                onChange={handleChange} 
                                orientation='vertical' 
                                sx={{ borderRight: 1, borderColor: 'divider' }}
                                >
                                    <Tab label="Contact and basic info" value="0" />
                                    <Tab label="Security and login" value="1" />
                                </TabList>
                        {/* </Paper> */}
                        <Box sx={{ width: '80%' }}>
                                <TabPanel sx={{ p: 0 }} value="0">
                                    <List>
                                        {itemsList.map((item, key) => {
                                            const {name, label, value, error, info} = item;
                                            let dashboardItems
                                            if (name==="name"||name==="address"||name==="dOB")
                                            dashboardItems = 
                                                <Controls.Dialog
                                                key={key}
                                                buttonText={value?"Edit":"Add"}
                                                dialogTitle={`Update ${label}`}
                                                label={label}
                                                name={name}
                                                type={name==="dOB"?"date":undefined}
                                                value={value}
                                                error={error}
                                                info={info}
                                                onChange={handleInputChange}
                                                handleConfirm={handleSubmit}
                                                />
                                            return dashboardItems
                                        })}
                                        
                                    </List>
                                </TabPanel>
                                <TabPanel sx={{ p: 0 }} value="1">
                                    <List>
                                        {itemsList.map((item, key) => {
                                            const {name, label, value, error, info} = item;
                                            let dashboardItems
                                            if (name==="phoneNumber"||name==="email"||name==="password")
                                            dashboardItems = 
                                                <Controls.Dialog
                                                key={key}
                                                buttonText={value?"Edit":"Add"}
                                                dialogTitle={`Update ${label}`}
                                                label={label}
                                                name={name}
                                                type={name==="phoneNumber"?"tel":name==="email"?"email":name==="password"?"password":undefined}
                                                value={value}
                                                error={error}
                                                info={info}
                                                onChange={handleInputChange}
                                                handleConfirm={handleSubmit}
                                                />
                                            return dashboardItems
                                        })}
                                    </List>
                                </TabPanel>
                                <Controls.Dialog
                                // buttonText="Save"
                                dialogTitle="Password Verification"
                                dialogText="Confirm your password"
                                name="password"
                                type="password"
                                error={errors.password}
                                ref={ref}
                                onChange={handlePassChange}
                                handleConfirm={handleSubmit}
                                />
                        </Box>
                    </TabContext>
                </Box>
            </Paper>
            </Box>
        </Box>
    )
}