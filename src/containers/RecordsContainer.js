import React, { useEffect } from 'react';
import RecordItem from '../components/RecordItem';
import RecordsServices from '../services/RecordsServices';
import { useAuth } from '../components/context/AuthContext';
import Controls from '../components/controls/Controls';
import { Box, List, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';



export default function RecordsContainer(params) {
    

    // Auth
    const { currentUser, records, setRecords } = useAuth()


    useEffect(() => {
        async function findRecords(user) {
            const allRecords = await RecordsServices.getAllRecords()
            const filteredRecords = allRecords.data.filter(element => element.user_id === user._id)
            setRecords(filteredRecords)
        }
        findRecords(currentUser)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentUser])

    return (
        <Box sx={{ p: 2 }}>
            <h1>Records</h1>
            <Controls.Button
            text="Home"
            // size="small"
            component={Link} to={"/"}
            />
            <Controls.Button
            text="Checklist"
            // size="small"
            color="warning"
            component={Link} to={"/checklist"}
            />
            <Controls.Button
            text="Dashboard"
            // size="small"
            color="success"
            component={Link} to={"/dashboard"}
            />
            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                <Paper 
                sx={{ p: 1, maxWidth: '800px', width: '100%' }}
                align="center"
                >
                    <Typography variant='h6'>Your previous records</Typography>
                    <List>
                        {records.map((element, i) => 
                            <RecordItem
                            record={element}
                            key={i}
                            />
                        )}
                    </List>
                </Paper>
            </Box>
        </Box>
    )
};
