import React from 'react';
// import { useHistory } from 'react-router-dom';
import { Paper } from '@mui/material';
import { useAuth } from './context/AuthContext';
import Controls from './controls/Controls';

function Dashboard({ children, ...rest }) {

    const { currentUser } = useAuth()

    // const history = useHistory();

    // async function handleLogout() {
    //     await logout();
    //     history.go(0);
    //     // window.location.reload(false);
    // }

    return (
        <Paper>
            <div>
                <h1>Dashboard</h1>
                <Controls.Button
                text="Home"
                size="small"
                color="success"
                href="/"
                />
                {/* <Controls.Button
                text="Log Out"
                onClick={handleLogout}
                /> */}
            </div>
                {/* <pre>{JSON.stringify(currentUser, null, 2)}</pre> */}
                <h4>id: {currentUser._id}</h4>
                <h4>name: {currentUser.name}</h4>
                <h4>email: {currentUser.email}</h4>
                <h4>phone number: {currentUser.phoneNumber}</h4>
                <h4>register date: {currentUser.registerDate}</h4>
        </Paper>
    )
}

export default Dashboard;