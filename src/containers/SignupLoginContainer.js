import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { Paper, Tab, Tabs, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    root: {
        "&.css-1woxyl6-MuiPaper-root" :{
            width: 320, 
            margin: "20px auto"
        },
        "&.css-1h9z7r5-MuiButtonBase-root-MuiTab-root" :{
            width: 160
        }
    }
})


export default function SignupLoginContainer() {

    const classes = useStyles();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
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
    }

    return (
        <Paper elevation={20} className={classes.root}>
            <Tabs value={value} onChange={handleChange}>
                <Tab className={classes.root} label="Log In" />
                <Tab className={classes.root} label="Sign Up" />
            </Tabs>
            <TabPanel value={value} index={0}><Login handleChange={handleChange} /></TabPanel>
            <TabPanel value={value} index={1}><Signup handleChange={handleChange} /></TabPanel>
        </Paper>
    )
}