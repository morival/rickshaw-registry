import { Paper } from '@mui/material';
import React from 'react';
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
                    <h3>Hi {currentUser.name}!<br/>You are logged in</h3>
                    <Controls.Button
                    text="Dashboard"
                    size="small"
                    color="success"
                    href="/dashboard"
                    />
                    {/* <Controls.Button
                    text="Log Out"
                    onClick={handleLogout}
                    /> */}
                </>
            :   <>
                    <h3>Welcome to the home page of Rickshaw Registery!</h3>
                </>
                // <Controls.Button
                // text="Log in / Sign up"
                // color="primary"
                // href="/login"
                // />
            }
        </Paper>
    );
}