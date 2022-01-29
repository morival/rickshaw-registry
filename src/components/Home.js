import { Paper } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Controls from './controls/Controls';

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
        <Paper>
            <h1>Home</h1>
            {loggedIn
            ?   <>
                    <h3>Hi {currentUser && currentUser.name}!<br/>You are logged in</h3>
                    <Controls.Button
                    text="Checklist"
                    size="small"
                    color="warning"
                    component={Link} to={"/checklist"}
                    />
                    <Controls.Button
                    text="Dashboard"
                    size="small"
                    color="success"
                    component={Link} to={"/dashboard"}
                    />
                </>
            :   <>
                    <h3>Welcome to the home page of Rickshaw Registery!</h3>
                </>
            }
        </Paper>
    );
}