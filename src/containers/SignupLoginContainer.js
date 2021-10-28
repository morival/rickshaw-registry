import React, { useState } from 'react';
// import { useAuth } from '../components/context/AuthContext';
import Login from '../components/LLogin';
import Signup from '../components/Signup';
import { Paper, Tab, Tabs, Typography, Box } from '@mui/material';
// import { useHistory, useLocation } from 'react-router';


export default function SignupLoginContainer() {


    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        // console.log(event)
        setValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box >
                        <Typography component={'span'}>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    };

    return (
        <Paper elevation={20} sx={{ width: 320, my: 2.5, mx: "auto" }}>
            <Tabs value={value} onChange={handleChange}>
                <Tab sx={{ width: 160 }} label="Log In" />
                <Tab sx={{ width: 160 }} label="Sign Up" />
            </Tabs>
            <TabPanel value={value} index={0}><Login handleChange={handleChange} /></TabPanel>
            <TabPanel value={value} index={1}><Signup handleChange={handleChange} /></TabPanel>
        </Paper>
    )
}