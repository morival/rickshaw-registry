import { Paper, Tab, Tabs, Typography, Box } from '@mui/material';
// import PropTypes from 'prop-types';
import React from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

function SignupLoginContainer() {

    const paperStyle = { width: 320, margin: "20px auto" };
    const tabStyle = { width: 160 };

    const [value, setValue] = React.useState(0);

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

    // TabPanel.propTypes = {
    //     children: PropTypes.node,
    //     index: PropTypes.number.isRequired,
    //     value: PropTypes.number.isRequired,
    // };

    return (
        <Paper elevation={20} style={paperStyle}>
            <Tabs value={value} onChange={handleChange}>
                <Tab style={tabStyle} label="Log In" />
                <Tab style={tabStyle} label="Sign Up" />
            </Tabs>
            <TabPanel value={value} index={0}><Login handleChange={handleChange} /></TabPanel>
            <TabPanel value={value} index={1}><Signup handleChange={handleChange} /></TabPanel>
        </Paper>
    )
}

export default SignupLoginContainer;