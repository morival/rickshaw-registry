import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import {UseForm, Form} from './UseForm';
import Controls from './controls/Controls';
import { List, ListItem, ListItemText, Paper, Tab } from '@mui/material';
import { Box } from '@mui/system';
import { TabContext, TabList, TabPanel } from '@mui/lab';


export default function Dashboard({ children, ...rest }) {

    const validate = (  fieldValues = formData ) => {
        let temp = {...errors}
        if('name' in fieldValues)
            temp.name = fieldValues.name ? "" : "This field is required."
        if('address' in fieldValues)
            temp.address = fieldValues.address ? "" : "This field is required."
        if('dOB' in fieldValues)
            temp.dOB = fieldValues.dOB ? "" : "This field is required."
        if('email' in fieldValues)
            temp.email = (/.+@.+..+/).test(fieldValues.email) ? "" : "Invalid email"
        if('phoneNumber' in fieldValues)
            temp.phoneNumber = fieldValues.phoneNumber.length>10 ? "" : "This number is too short"
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
            return Object.values(temp).every(x => x === "")
    }
 
    
    const { currentUser, updateProfile } = useAuth()

    const { formData, errors, setErrors, handleInputChange } = UseForm(currentUser, true, validate)

    const [panel, setPanel] = useState("0")

    const [openForm, setOpenForm] = useState()

    const handleChange = (event, newValue) => {
        setPanel(newValue);
    };

    // async function save(name) {
    //     try {
    //         const res = await updateProfile(formData)
    //     } catch(err) {
    //         setErrors(err)
    //     } finally {
    //         setOpenForm(undefined)
    //     }
    // }


    const itemsList = [{
        name: "name",
        label: "Name",
        value: formData.name
    }, {
        name: "address",
        label: "Address",
        value: formData.address
    }, {
        name: "dOB",
        label: "Date of birth",
        value: formData.dOB
    }, {
        name: "email",
        label: "Email",
        value: formData.email
    }, {
        name: "phoneNumber",
        label: "Phone number",
        value: formData.phoneNumber
    }]

    async function handleSubmit(e) {
        e.preventDefault()
        // console.log(formData)
        const res = await updateProfile(formData)
        if (res.status && res.status === 409) {
            console.log(res)
            res.data.code === "email"
            ?   setErrors({ email: res.data.message })
            :   setErrors({ phoneNumber: res.data.message })
            return
        }
        try {
            if (res) {
                console.log(res)
                const newUser = {userLogin: formData.email, password: formData.password}
                localStorage.setItem('user', JSON.stringify(newUser))
            }
        } catch(err) {
            setErrors(err)
        }
    }

    return (
        <Box sx={{ p: 2 }}>
            <h1>Dashboard</h1>
            <Controls.Button
            text="Home"
            size="small"
            color="success"
            href="/"
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
                                            const {name, label, value} = item;
                                            return(
                                                <ListItem key={key}>
                                                    <ListItemText 
                                                    primary={label}
                                                    sx={{ maxWidth: 150 }}
                                                    />
                                                    {openForm===name
                                                    ?   <Form>
                                                            <Controls.Input
                                                            name={name}
                                                            label={label}
                                                            value={value?value:""}
                                                            type={name==="dOB"?"date":name==="phoneNumber"?"number":name==="email"?"email":undefined}
                                                            onChange={handleInputChange}
                                                            error={errors.email}
                                                            autoFocus
                                                            />
                                                            <Controls.Button
                                                            text="Save"
                                                            onClick={()=> setOpenForm(undefined)}
                                                            />
                                                        </Form>
                                                    :   <>
                                                            <ListItemText primary={value}/>
                                                            <Controls.Button 
                                                            text={value?"Edit":"Add"}
                                                            size="small" 
                                                            name={name} 
                                                            value={value} 
                                                            onClick={()=> setOpenForm(name)}
                                                            />
                                                        </>
                                                    }
                                                </ListItem>
                                            )
                                        })}
                                        <Controls.Dialog
                                        buttonText="Save"
                                        dialogTitle="Password Verification"
                                        dialogText="Confirm your password"
                                        inputName="password"
                                        inputType="password"
                                        // inputValue={formData.password}
                                        inputOnChange={handleInputChange}
                                        handleConfirm={handleSubmit}
                                        />
                                    </List>
                                </TabPanel>
                                <TabPanel value="1">
                                    <List>
                                        
                                    </List>
                                </TabPanel>
                        </Box>
                    </TabContext>
                </Box>
            </Paper>
            </Box>
        </Box>
    )
}