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
        const testPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        // if('address' in fieldValues)
        //     temp.address = fieldValues.address ? "" : "This field is required."
        // if('dOB' in fieldValues)
        //     temp.dOB = fieldValues.dOB ? "" : "This field is required."
        if('email' in fieldValues)
            temp.email = testEmail.test(fieldValues.email) ? "" : "Invalid email"
        if('phoneNumber' in fieldValues)
            temp.phoneNumber = testNumber.test(fieldValues.phoneNumber) ? "" : "This number is too short"
        if('password' in fieldValues)
            temp.password = testPassword.test(fieldValues.password) ? "" : "Invalid password: 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
            return Object.values(temp).every(x => x === "")
    }
 
    
    const { currentUser, setCurrentUser } = useAuth()

    const { formData, errors, setErrors, handleInputChange } = UseForm(currentUser, true, validate)

    
    const [panel, setPanel] = useState("0");

    const [passwordVerification, setPasswordVerification] = useState({ password: "" });

    const [closeDialog, setCloseDialog] = useState(false);

    const handlePassChange = (e) => {
        setPasswordVerification({ password: e.target.value });
        validate({ password: e.target.value })
    }

    const refOpen = useRef(null);

    const handleChange = (event, newValue) => {
        setPanel(newValue);
    };

        // const cleanupForm = () => {
        //     setFormData(currentUser)
        // }
    
    async function handleSubmit(e) {
        e.preventDefault()
        console.log(e)
        try {
            // if password was not verified open password verification window
            if (!passwordVerification.password) {
                console.log("password verification required")
                refOpen.current.handleOpen();
            } else {
                if (!validate()) {
                    return console.log("validation failed")
                } else {
                    console.log("password verification passed")
                    const user = { _id: currentUser._id, password: passwordVerification.password }
                    const authPassword = await UsersServices.authenticateUser(user)
                    // console.log("id: "+currentUser._id)
                    // console.log("password: "+passwordVerification.password)
                    // console.log(authPassword)
                    // console.log(formData)
                    if (authPassword.status === 401) {
                        // cleanupForm();
                        setPasswordVerification({password:""})
                        console.log("password verification reset")
                        console.log(passwordVerification)
                        setErrors({ password: authPassword.data.message })
                        return authPassword
                    }
                    else if (authPassword.status < 300) {
                        const res = await UsersServices.updateUser(formData)
                        console.log(res)
                        if (res && res.status < 300) {
                            setCurrentUser(res.data)
                            setCloseDialog((prevState) => !prevState)
                            console.log("set res.data and handleClose")
                        } else if (res && res.status === 409) {
                            setErrors(res.data.code === "email"
                            ?   { email: res.data.message }
                            :   { phoneNumber: res.data.message }
                            )
                        }
                        return res
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
                                    <Tab label="Address details" value="1" />
                                    <Tab label="Security " value="2" />
                                </TabList>
                        {/* </Paper> */}
                        <Box sx={{ width: '80%' }}>
                                <TabPanel sx={{ p: 0 }} value="0">
                                    <List>
                                        <Controls.Dialog
                                        label="Name"
                                        name="name"
                                        defaultValue={currentUser.name}
                                        value={formData.name}
                                        error={errors.name}
                                        onChange={handleInputChange}
                                        handleConfirm={handleSubmit}
                                        closeDialog={closeDialog}
                                        // cleanupForm={cleanupForm}
                                        />
                                        <Controls.Dialog
                                        label="Email"
                                        name="email"
                                        type="email"
                                        defaultValue={currentUser.email}
                                        value={formData.email}
                                        error={errors.email}
                                        onChange={handleInputChange}
                                        handleConfirm={handleSubmit}
                                        closeDialog={closeDialog}
                                        // cleanupForm={cleanupForm}
                                        />
                                        <Controls.Dialog
                                        label="Phone Number"
                                        name="phoneNumber"
                                        type="tel"
                                        defaultValue={currentUser.phoneNumber}
                                        value={formData.phoneNumber}
                                        error={errors.phoneNumber}
                                        onChange={handleInputChange}
                                        handleConfirm={handleSubmit}
                                        closeDialog={closeDialog}
                                        // cleanupForm={cleanupForm}
                                        />
                                        <Controls.Dialog
                                        label="Date of Birth"
                                        name="dOB"
                                        type="date"
                                        defaultValue={currentUser.dOB}
                                        value={formData.dOB}
                                        error={errors.dOB}
                                        onChange={handleInputChange}
                                        handleConfirm={handleSubmit}
                                        closeDialog={closeDialog}
                                        // cleanupForm={cleanupForm}
                                        />
                                    </List>
                                </TabPanel>
                                <TabPanel sx={{ p: 0 }} value="1">
                                    <List>
                                        <Controls.Dialog
                                        label="Address Line 1"
                                        name="line_1"
                                        defaultValue={currentUser.line_1}
                                        value={formData.line_1}
                                        error={errors.line_1}
                                        onChange={handleInputChange}
                                        handleConfirm={handleSubmit}
                                        closeDialog={closeDialog}
                                        // cleanupForm={cleanupForm}
                                        />
                                        <Controls.Dialog
                                        label="Address Line 2"
                                        name="line_2"
                                        defaultValue={currentUser.line_2}
                                        value={formData.line_2}
                                        error={errors.line_2}
                                        onChange={handleInputChange}
                                        handleConfirm={handleSubmit}
                                        closeDialog={closeDialog}
                                        // cleanupForm={cleanupForm}
                                        />
                                        <Controls.Dialog
                                        label="Address Line 3"
                                        name="line_3"
                                        defaultValue={currentUser.line_3}
                                        value={formData.line_3}
                                        error={errors.line_3}
                                        onChange={handleInputChange}
                                        handleConfirm={handleSubmit}
                                        closeDialog={closeDialog}
                                        // cleanupForm={cleanupForm}
                                        />
                                        <Controls.Dialog
                                        label="Town or City"
                                        name="post_town"
                                        defaultValue={currentUser.post_town}
                                        value={formData.post_town}
                                        error={errors.post_town}
                                        onChange={handleInputChange}
                                        handleConfirm={handleSubmit}
                                        closeDialog={closeDialog}
                                        // cleanupForm={cleanupForm}
                                        />
                                        <Controls.Dialog
                                        label="Postcode"
                                        name="postcode"
                                        defaultValue={currentUser.postcode}
                                        value={formData.postcode}
                                        error={errors.postcode}
                                        onChange={handleInputChange}
                                        handleConfirm={handleSubmit}
                                        closeDialog={closeDialog}
                                        // cleanupForm={cleanupForm}
                                        />
                                        
                                    </List>
                                </TabPanel>
                                <TabPanel sx={{ p: 0 }} value="2">
                                    <List>
                                        <Controls.Dialog
                                        label="Password"
                                        name="password"
                                        type="password"
                                        defaultValue={currentUser.password}
                                        value={formData.password}
                                        error={errors.password}
                                        onChange={handleInputChange}
                                        handleConfirm={handleSubmit}
                                        closeDialog={closeDialog}
                                        // cleanupForm={cleanupForm}
                                        />
                                    </List>
                                </TabPanel>
                                <Controls.Dialog
                                dialogTitle="Password Required"
                                dialogText="Confirm your current password"
                                name="password"
                                type="password"
                                error={errors.password}
                                onChange={handlePassChange}
                                handleConfirm={handleSubmit}
                                ref={refOpen}
                                />
                        </Box>
                    </TabContext>
                </Box>
            </Paper>
            </Box>
        </Box>
    )
}