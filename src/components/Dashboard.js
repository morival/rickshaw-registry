import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import {UseForm, Form} from './UseForm';
import Controls from './controls/Controls';
import { List, ListItem, ListItemText, Paper, Tab } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { Box } from '@mui/system';
import { TabContext, TabList, TabPanel } from '@mui/lab';


export default function Dashboard({ children, ...rest }) {
    
    
    // const initialValues = Object.create(currentUser)

    // const initialValues = {
    //     name: "",
    //     address: "",
    //     dOB: new Date(),
    //     email: "",
    //     phoneNumber: ""
    // }
    
    
    const { currentUser, updateProfile } = useAuth()

    const { formData, setErrors, handleInputChange } = UseForm(currentUser)

    const [value, setValue] = useState("0")

    const [openForm, setOpenForm] = useState()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // const handleOpenForm = e => {
    //     console.log(formData)
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
        try {
            if (res) {
                console.log(res)
            }
        } catch(err) {
            setErrors(err.mes)
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
                    <TabContext value={value}>
                        {/* <Paper> */}
                                <TabList 
                                value={value} 
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
                                                    ?   <Form onSubmit={handleSubmit}>
                                                            <Controls.Input
                                                            name={name}
                                                            value={value?value:""}
                                                            onChange={handleInputChange}
                                                            autoFocus
                                                            />
                                                            <Controls.Button
                                                            text="Save"
                                                            type="submit"
                                                            />
                                                        </Form>
                                                    :   <ListItemText primary={value}/>
                                                    }
                                                    {openForm===name
                                                    ?   ""
                                                    :   <Controls.Button 
                                                        text={value?"Edit":"Add"}
                                                        // endIcon={value?<Edit/>:<Add/>}
                                                        size="small" 
                                                        name={name} 
                                                        value={value} 
                                                        onClick={()=> setOpenForm(name)}
                                                    />
                                                    }
                                                    
                                                </ListItem>
                                                // <ListItem key={key}>
                                                //     <ListItemText primary={label}/>
                                                //     {openForm===name
                                                //     ?   <Form>
                                                //             <Controls.Input
                                                //             name={name}
                                                //             value={value}
                                                //             onChange={handleInputChange}
                                                //             autoFocus
                                                //             />
                                                //         </Form>
                                                //     :   <ListItemText primary={value}/>
                                                //     }
                                                //     <Controls.Button 
                                                //     text={value?"Edit":"Add"}
                                                //     // endIcon={value?<Edit/>:<Add/>}
                                                //     size="small" 
                                                //     name={name} 
                                                //     value={value} 
                                                //     onClick={()=> setOpenForm(name)}
                                                //     />
                                                // </ListItem>
                                            )
                                        })}
                                    </List>
                                </TabPanel>
                                <TabPanel value="1"></TabPanel>
                        </Box>
                    </TabContext>
                </Box>
            </Paper>
            </Box>
        </Box>
    )
}