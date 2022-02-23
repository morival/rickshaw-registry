import React, { useState, useRef } from 'react';
import UsersServices from '../services/UsersServices';
import DashboardItem from '../components/DashboardItem';
import { useAuth } from '../components/context/AuthContext';
import { UseForm } from '../components/UseForm';
import Controls from '../components/controls/Controls';
import ProfileContent from '../components/content/ProfileDescriptions';
import { List, Paper, Tab, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Link } from 'react-router-dom';



export default function DashboardContainer( children, ...rest ) {
    
    
    const theme = useTheme();
    
    const isMediumScreen = useMediaQuery(theme.breakpoints.up('md'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    // Validation
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
    
    const filteredDashboardItems = (names) => (ProfileContent.profileDetails
        .filter(element => names.includes(element.name))
        .map((element, i) => {
            const elementName = element.name
            return <DashboardItem
            key={i}
            label={element.label}
            name={element.name}
            type={element.type}
            defaultValue={currentUser[elementName]}
            value={formData[elementName]}
            error={errors[elementName]}
            onChange={handleInputChange}
            handleConfirm={handleSubmit}
            closeDialog={closeDialog}
            />
        })
    )


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
    
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            // if password was not verified open password verification window
            if (!passwordVerification.password) {
                console.log("password verification required")
                refOpen.current.handleOpen();
            } else if (!validate()) {
                return console.log("validation failed")
            } else {
                console.log("password verification and validation passed")
                const user = { _id: currentUser._id, password: passwordVerification.password }
                const authPassword = await UsersServices.authenticateUser(user)
                if (authPassword.status === 401) {
                    setPasswordVerification({password:""})
                    console.log("password verification reset")
                    console.log(passwordVerification)
                    setErrors({ password: authPassword.data.message })
                    return authPassword
                } else if (authPassword.status < 300) {
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
        <Box sx={isSmallScreen ? { p: 1 } : { p: 2 }}>
            <h1>Dashboard</h1>
            <Controls.Button
            text="Home"
            size="small"
            color="success"
            component={Link} to={"/"}
            />
            <Controls.Button
            text="Checklist"
            size="small"
            color="warning"
            component={Link} to={"/checklist"}
            />
            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                <Paper sx={{ p: 1, maxWidth: '800px', width: '100%' }}>
                    <Box
                    sx={isMediumScreen
                        ? { display: 'flex'}
                        : {  }}
                        >
                        <TabContext value={panel}>
                            <TabList 
                            value={panel} 
                            onChange={handleChange}
                            orientation={isMediumScreen ? 'vertical' : 'horizontal'}
                            sx={isMediumScreen 
                                ? { borderRight: 1, borderColor: 'divider' } 
                                : { borderBottom: 1, borderColor: 'divider', minHeight: '36px' }}
                            >
                                {ProfileContent.profileTabs.map((element, i) => {
                                    return(
                                        <Tab
                                        sx={isSmallScreen
                                            ? { fontSize: '0.625rem', padding: '6px 8px', minHeight: '36px', minWidth: '' }
                                            : {}}
                                        label={element} 
                                        key={i} 
                                        value={i.toString()} 
                                        />
                                    )
                                })}
                            </TabList>
                            <Box sx={{ width: '100%' }}>
                                <TabPanel sx={{ p: 0 }} value="0">
                                    <List>
                                        {filteredDashboardItems(["name", "email", "phoneNumber", "dOB"])}
                                    </List>
                                </TabPanel>
                                <TabPanel sx={{ p: 0 }} value="1">
                                    <List>
                                        {filteredDashboardItems(["line_1", "line_2", "line_3", "post_town", "postcode"])}
                                        
                                    </List>
                                </TabPanel>
                                <TabPanel sx={{ p: 0 }} value="2">
                                    <List>
                                        {filteredDashboardItems(["password"])}
                                    </List>
                                </TabPanel>
                                <DashboardItem
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
};
