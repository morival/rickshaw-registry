import { Paper } from '@mui/material';
import React from 'react';
import Controls from './controls/Controls';

function Dashboard(props) {


    const handleLogout = () => {}

    return (
        <Paper>
            <div>
                <Controls.Button
                text="Log Out"
                onClick={handleLogout}
                />
            </div>
        </Paper>
    );
}

export default Dashboard;