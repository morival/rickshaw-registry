import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { Paper, Tab } from '@mui/material';


export default function SignupLoginContainer() {


    const [value, setValue] = useState("0");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper sx={{ width: "100%", maxWidth: 320, my: 2.5, mx: "auto" }}>
            <TabContext value={value}>
            <TabList value={value} onChange={handleChange} variant="fullWidth">
                <Tab label="Log In" value="0" />
                <Tab label="Sign Up" value="1" />
            </TabList>
            <TabPanel sx={{ p:0 }} value="0"><Login handleChange={handleChange} /></TabPanel>
            <TabPanel sx={{ p:0 }} value="1"><Signup handleChange={handleChange} /></TabPanel>
            </TabContext>
        </Paper>
    )
}