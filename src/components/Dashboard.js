import React from 'react';
import { useHistory } from 'react-router-dom';
import { Paper } from '@mui/material';
import { useAuth } from './context/AuthContext';
import Controls from './controls/Controls';

function Dashboard({ children, ...rest }) {

    const { currentUser, logout } = useAuth()

    const history = useHistory();

    async function handleLogout() {
        await logout();
        history.go(0);
        // window.location.reload(false);
    }

    return (
        <Paper>
            <h1>Dashboard</h1>
            <div>
                <Controls.Button
                text="Home"
                size="small"
                color="success"
                href="/"
                />
                <Controls.Button
                text="Log Out"
                onClick={handleLogout}
                />
                <pre>{JSON.stringify(currentUser, null, 2)}</pre>
            </div>
        </Paper>
    )
}

export default Dashboard;