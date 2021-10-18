import { Paper } from '@mui/material';
import React from 'react';
import { useAuth } from './context/AuthContext';
import Controls from './controls/Controls';

function Dashboard(props) {

    const { currentUser } = useAuth()

    const handleLogout = () => {}

    return (
        <Paper>
            <div>
                <Controls.Button
                text="Log Out"
                onClick={handleLogout}
                />
                <pre>{JSON.stringify(currentUser, null, 2)}</pre>
            </div>
        </Paper>
    );
}

export default Dashboard;