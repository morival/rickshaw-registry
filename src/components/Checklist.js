import React from 'react';
import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import Controls from './controls/Controls';

export default function Checklist(params) {
    

    return(
        <Box sx={{ p: 2 }}>
            <h1>Checklist</h1>
            <Controls.Button
            text="Home"
            size="small"
            component={Link} to={"/"}
            />
            <Controls.Button
            text="Dashboard"
            size="small"
            color="success"
            component={Link} to={"/dashboard"}
            />
            <Box sx={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
            <Paper sx={{ p: 1, maxWidth: '800px', width: '100%' }}>
                <Box sx={{ display: 'flex' }}>

                </Box>
            </Paper>
            </Box>
        </Box>
    )
};
