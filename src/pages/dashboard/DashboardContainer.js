import React, { useState, useRef } from 'react';
import DashboardItem from './DashboardItem';
import DashboardDeleteItem from './DashboardItemDeleteAccount'
import Controls from 'components/controls/Controls';
import { useAuth } from 'context/AuthContext';
import { UseForm } from 'components/UseForm';
import Content from 'components/content/ProfileDescriptions';
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
        temp.name = fieldValues.name ? "" : "Field required"
        if('email' in fieldValues)
        temp.email = validEmail.test(fieldValues.email) ? "" : "Invalid email"
        if('phoneNumber' in fieldValues)
        temp.phoneNumber = validNumber.test(fieldValues.phoneNumber) ? "" : "The number is too short"
        if('password' in fieldValues)
        temp.password = validPassword.test(fieldValues.password) ? "" : "Invalid password: 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
        return Object.values(temp).every(x => x === "")
    }
    
    // Auth Context
    const { user, testEmailAndPhoneNo, authenticate, updateUser, deleteUser, deleteUserRecord, logout } = useAuth();
    // Forms
    const { formData, errors, setErrors, handleInputChange, resetForm } = UseForm(user, true, validate)
    // refresh Data Form
    // const refreshFormData = () => {
    //     setFormData(user);
    //     setErrors({});
    // }

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
                onCancel={resetForm}
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
                // check for duplicate email or phone number in DB and set errors
                const res = await testEmailAndPhoneNo(formData)
                if (res && res.status === 203) {
                    setErrors(res.data)
                } else {
                    // request password verification if not done before
                    if (!passwordVerification.password) {
                        setAction("Submit");
                        refOpen.current.handleOpen();
                    } else {
                        const userCredentials = { _id: user._id, password: passwordVerification.password }
                        const auth = await authenticate(userCredentials)
                        // request to update DB with formData
                        if (auth.status === 200) {
                            if (!formData.password)
                                formData['password'] = passwordVerification.password
                            console.log(formData)
                            const res = await updateUser(formData, "user")
                            if (res && res.status === 200) {
                                setCloseDialog((prevState) => !prevState)
                                console.log("Update completed")
                            }
                        // else, set errors and refresh passwordVerification form
                        } else {
                            console.log(auth.data)
                            refreshPasVer();
                            setErrors(auth.data)
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
                } else if (auth.status < 300) {
                    const res = await deleteUser(auth.data)
                    if (res.status < 300) {
                        deleteUserRecord(user)
                        handleLogout();
                    }
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
            <Controls.Button
                text="Admin Panel"
                color="secondary"
                component={Link} to={"/admin"}
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
                                            ?   { fontSize: '0.625rem', p: 0.75, minHeight: '36px', minWidth: '' }
                                            :   { p: 0 }}
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
                                        {dashboardComponents(["lic_type", "lic_no", "lic_name", "lic_isb", "lic_iso", "lic_exp"])}
                                        
                                    </List>
                                </TabPanel>
                                <TabPanel sx={{ p: 0 }} value="3">
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