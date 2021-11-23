import React, { useState } from 'react';
import { List, ListItem, ListItemText, Paper, Tab } from '@mui/material';
import { Add, Edit } from '@mui/icons-material';
import { useAuth } from './context/AuthContext';
import Controls from './controls/Controls';
import { Box } from '@mui/system';
import { TabContext, TabList, TabPanel } from '@mui/lab';

export default function Dashboard({ children, ...rest }) {

    const { currentUser } = useAuth()

    const [value, setValue] = useState("0")

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // console.log(ListItem)
    // console.log(currentUser.address)

    const itemsList = [{
        text: 'Name',
        value: currentUser.name
    }, {
        text: 'Address',
        value: currentUser.address
    }, {
        text: 'Date of birth',
        value: currentUser.dOB
    }, {
        text: 'Email',
        value: currentUser.email
    }, {
        text: 'Phone number',
        value: currentUser.phoneNumber
    }]

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
            <Paper sx={{ p: 1, maxWidth: "800px", width: '100%' }}>
                <Box sx={{ display: 'flex' }}>
                    <TabContext value={value}>
                        {/* <Paper> */}
                                <TabList 
                                value={value} 
                                onChange={handleChange} 
                                orientation="vertical" 
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
                                            const {text, value} = item;
                                            return(
                                                <ListItem key={key}>
                                                    <ListItemText primary={text}/>
                                                    <ListItemText primary={value}/>
                                                    {value
                                                    ?   <Controls.Button text="Edit" endIcon={<Edit />}/>
                                                    :   <Controls.Button text="Add" endIcon={<Add />}/>
                                                    }
                                                </ListItem>
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
        
                    // <Paper>
                    //     <h4>id: {currentUser._id}</h4>
                    //     <h4>name: {currentUser.name}</h4>
                    //     <h4>email: {currentUser.email}</h4>
                    //     <h4>phone number: {currentUser.phoneNumber}</h4>
                    //     <h4>register date: {currentUser.registerDate}</h4>
                    // </Paper> 
        
    )
}