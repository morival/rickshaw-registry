import React, { useState, useRef } from 'react';
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
    
    
    // Theme Media Query
    const theme = useTheme();
    const isSS = useMediaQuery(theme.breakpoints.down('sm'));
    
    // Validation
    const validate = (  fieldValues = formData ) => {
        let temp = {...errors}
        const validEmail = /.+@.+..+/;
        const validNumber = /^\d+.{10,20}$/;
        const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if('name' in fieldValues)
        temp.name = fieldValues.name ? "" : "This field is required."
        if('email' in fieldValues)
        temp.email = validEmail.test(fieldValues.email) ? "" : "Invalid email"
        if('phoneNumber' in fieldValues)
        temp.phoneNumber = validNumber.test(fieldValues.phoneNumber) ? "" : "This number is too short"
        if('password' in fieldValues)
        temp.password = validPassword.test(fieldValues.password) ? "" : "Invalid password: 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
        return Object.values(temp).every(x => x === "")
    }
    
    // Auth Context
    const { user, setUser, testEmailAndPhoneNo, authenticate, updateUser, deleteUser, logout, rememberMe, setCookie } = useAuth();
    // Forms
    const { formData, setFormData, errors, setErrors, handleInputChange } = UseForm(user, true, validate)
    // refresh Data Form
    const refreshFormData = () => {
        setFormData(user);
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
                defaultValue={user[element.name]}
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
            // validate entry
            if (validate()) {
                // check for duplicate email or phone number in DB
                const res = await testEmailAndPhoneNo(formData)
                console.log(res)
                // if duplicate, set errors
                if (res && res.status === 200) {
                    setErrors(res.data.code === "email" ? { email: res.data.message } : { phoneNumber: res.data.message })
                } else {
                    // request password verification if not done before
                    if (!passwordVerification.password) {
                        setAction("Submit");
                        refOpen.current.handleOpen();
                    } else {
                        const userCredentials = { _id: user._id, password: passwordVerification.password }
                        const auth = await authenticate(userCredentials)
                        // if password verification failed, set errors
                        if (auth.status === 401) {
                            refreshPasVer();
                            setErrors({ password: auth.data.message })
                        // else request to update DB with formData
                        } else if (auth.status < 300) {
                            const res = await updateUser(formData)
                            if (res && res.status < 300) {
                                setUser(res.data)
                                setCloseDialog((prevState) => !prevState)
                                // setFormData(res.data)
                                // if rememeberMe is on, save user details to Cookies
                                if (rememberMe) 
                                    setCookie('user', res.data, { path:'/' })
                                console.log("Update completed")
                            }
                            return res
                        }
                    }
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
                const userCredentials = { _id: user._id, password: passwordVerification.password }
                const auth = await authenticate(userCredentials)
                if (auth.status === 401) {
                    refreshPasVer();
                    setErrors({ password: auth.data.message })
                    return auth
                } else if (auth.status < 300) {
                    const res = await deleteUser(auth.data)
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
        <Box sx={{ p: isSS ? 1 : 2 }}>
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
                <Paper sx={{ p: 1, maxWidth: '700px', width: '100%' }}>
                    <Box sx={{ display: isSS ? null : 'flex'}}>
                        <TabContext value={panel}>
                            <TabList 
                                value={panel} 
                                onChange={handleChangePanel}
                                orientation={isSS ? 'horizontal' : 'vertical'}
                                sx={{ borderRight: 1, borderColor: 'divider', minHeight: isSS ? '36px' : null }}
                            >
                                {Content.profileTabs.map((element, i) => {
                                    return(
                                        <Tab
                                            sx={isSS
                                                ? { fontSize: '0.625rem', p: 0.75, minHeight: '36px', minWidth: '' }
                                                : { p: 0 }}
                                            label={element} 
                                            key={i} 
                                            value={i.toString()} 
                                        />
                                    )
                                })}
                            </TabList>
                            <Box sx={{ width: '100%' }}>
                                <TabPanel sx={{ p: 0 }} value="0">
                                    <List sx={{ pb: 0 }}>
                                        {dashboardComponents(["name", "email", "phoneNumber", "dOB"])}
                                    </List>
                                </TabPanel>
                                <TabPanel sx={{ p: 0 }} value="1">
                                    <List sx={{ pb: 0 }}>
                                        {dashboardComponents(["line_1", "line_2", "line_3", "post_town", "postcode"])}
                                        
                                    </List>
                                </TabPanel>
                                <TabPanel sx={{ p: 0 }} value="2">
                                    <List sx={{ pb: 0 }}>
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