import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';
import Controls from '../components/controls/Controls';

export default function Home() {

    const { user, loggedIn }  = useAuth()
    return (
        <Box sx={{ p: 2 }}>
            <h1>Home</h1>
            {loggedIn
            ?   <>
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
                    text="Dashboard"
                    color="success"
                    component={Link} to={"/dashboard"}
                    />
                </>
            : null}
            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                <Paper sx={{ p: 1, maxWidth: '700px', width: '100%' }}>
                    {loggedIn
                    ?   <Typography variant='h6'>Hi {user && user.name}!<br/>You are logged in</Typography>
                    :   <Typography variant='h6'>Welcome to the home page of Rickshaw Registery!</Typography>}
                </Paper>
            </Box>
        </Box>
    );
}