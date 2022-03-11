import React from 'react';
import { Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';
import Controls from '../components/controls/Controls';

export default function Home() {

    const { currentUser, loggedIn }  = useAuth()

    // const history = useHistory();

    // async function handleLogout() {
    //     await logout();
    //     history.go(0);
    //     // window.location.reload(false);
    // }
    // // console.log(currentUser)
    
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
                        <Paper>
                            <h3>Hi {currentUser && currentUser.name}!<br/>You are logged in</h3>
                        </Paper>
                    </>
                :   <Paper>
                        <h3>Welcome to the home page of Rickshaw Registery!</h3>
                    </Paper>
                }
        </Box>
    );
}