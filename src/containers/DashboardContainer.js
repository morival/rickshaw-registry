import React, { useState, useRef } from 'react';
import UsersServices from '../services/UsersServices';
import DashboardItem from '../components/DashboardItem';
import DashboardDeleteItem from '../components/DashboardItemDeleteAccount'
import { useAuth } from '../components/context/AuthContext';
import { UseForm } from '../components/UseForm';
import Controls from '../components/controls/Controls';
import Content from '../components/content/ProfileDescriptions';
import { Box, List, Paper, Tab, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';



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
    
    // Current User Details
    const { currentUser, setCurrentUser, logout } = useAuth()
    // Forms
    const { formData, setFormData, errors, setErrors, handleInputChange } = UseForm(currentUser, true, validate)
    // refresh Data Form
    const refreshFormData = () => {
        setFormData(currentUser);
        setErrors({});
    }

    // Password Verification Form
    const [passwordVerification, setPasswordVerification] = useState({ password: "" });
    // handle Password Verification Change
    const handlePasVerChange = (e) => {
        setPasswordVerification({ password: e.target.value });
        validate({ password: e.target.value })
    }
    // refresh Password Verification Form
    const refreshPasVer = () => {
        setPasswordVerification({password: ""});
        setErrors({});
    }

    // Dashboard Panels
    const [panel, setPanel] = useState("0");
    
    const handleChangePanel = (event, newValue) => {
        setPanel(newValue);
    };
    
    
    // Dashboard Components
    const dashboardComponents = (names) => (Content.profileDetails
        .filter(element => names.includes(element.name))
        .map((element, i) => 
            <DashboardItem
                label={element.label}
                name={element.name}
                type={element.type}
                defaultValue={currentUser[element.name]}
                value={formData[element.name]}
                error={errors[element.name]}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                onCancel={refreshFormData}
                closeDialog={closeDialog}
                key={i}
            /> 
        )
    )

    
    const [closeDialog, setCloseDialog] = useState(false);


    const [action, setAction] = useState();

    const handleAction = (e) => {
        action === "Submit"
        ?   handleSubmit(e)
        : handleDeleteAcc(e)
    }
    
    const refOpen = useRef(null);
    
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const data = await UsersServices.getAllUsers();
            const users = data.data
            // Check if the email is already used by another user
            if (users.some((element) => element.email === formData.email && element._id !== formData._id))
                setErrors({ email: "Email already exists" })
            // Check if the phone number is already used by another user
            else if (users.some((element) => element.phoneNumber === formData.phoneNumber && element._id !== formData._id))
                setErrors({ phoneNumber: "Phone number already exists" })
            // if password was not verified open password verification window
            else if (!passwordVerification.password) {
                setAction("Submit")
                refOpen.current.handleOpen();
            // else run authentification
            } else {
                const user = { _id: currentUser._id, password: passwordVerification.password }
                const auth = await UsersServices.authenticateUser(user)
                if (auth.status === 401) {
                    refreshPasVer();
                    setErrors({ password: auth.data.message })
                    return auth
                } else if (auth.status < 300) {
                    const res = await UsersServices.updateUser(formData)
                    if (res && res.status < 300) {
                        setCurrentUser(res.data)
                        setCloseDialog((prevState) => !prevState)
                        setFormData(res.data)
                        console.log("Update completed")
                    }
                    return res
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    const history = useHistory();

    function handleLogout() {
        history.push('/')
        logout();
    }
    
    async function handleDeleteAcc(e) {
        e.preventDefault()
        try {
            if (!passwordVerification.password) {
                setAction("Delete")
                refOpen.current.handleOpen();
            } else {
                const user = { _id: currentUser._id, password: passwordVerification.password }
                const auth = await UsersServices.authenticateUser(user)
                if (auth.status === 401) {
                    refreshPasVer();
                    setErrors({ password: auth.data.message })
                    return auth
                } else if (auth.status < 300) {
                    const res = await UsersServices.deleteUser(auth.data)
                    if (res.status < 300)
                        handleLogout();
                }
            }
        } catch (err) {
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
                component={Link} to={"/"}
            />
            <Controls.Button
                text="Checklist"
                color="warning"
                component={Link} to={"/checklist"}
            />
            <Controls.Button
                text="Records"
                color="error"
                component={Link} to={"/records"}
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
                                onChange={handleChangePanel}
                                orientation={isMediumScreen ? 'vertical' : 'horizontal'}
                                sx={isMediumScreen 
                                  ? { borderRight: 1, borderColor: 'divider' } 
                                  : { borderBottom: 1, borderColor: 'divider', minHeight: '36px' }}
                            >
                                {Content.profileTabs.map((element, i) => {
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
                                        {dashboardComponents(["name", "email", "phoneNumber", "dOB"])}
                                    </List>
                                </TabPanel>
                                <TabPanel sx={{ p: 0 }} value="1">
                                    <List>
                                        {dashboardComponents(["line_1", "line_2", "line_3", "post_town", "postcode"])}
                                        
                                    </List>
                                </TabPanel>
                                <TabPanel sx={{ p: 0 }} value="2">
                                    <List>
                                        {dashboardComponents(["password"])}
                                        <DashboardDeleteItem
                                            onSubmit={handleDeleteAcc}
                                        />
                                    </List>
                                </TabPanel>
                                <DashboardItem
                                    name="password"
                                    type="password"
                                    dialogTitle="Password Required"
                                    dialogText="Confirm your current password"
                                    error={errors.password}
                                    onChange={handlePasVerChange}
                                    onSubmit={handleAction}
                                    onCancel={refreshPasVer}
                                    closeDialog={closeDialog}
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