import React, { useEffect, useState } from 'react';
import RecordsServices from '../services/RecordsServices';
import { useAuth } from '../components/context/AuthContext';
import Controls from '../components/controls/Controls';
import { Box, List, ListItem, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';



export default function RecordsContainer(params) {
    


    // Auth
    const { currentUser, records, setRecords } = useAuth()

    // const recordsComponent = (user) => ()

    useEffect(() => {
        async function findRecords(user) {
            const allRecords = await RecordsServices.getAllRecords()
            const filteredRecords = allRecords.data.filter(element => element.user_id === user._id)
            setRecords(filteredRecords)
            console.log(records)
        }
        findRecords(currentUser)
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
            <Box>
                <Paper align="center">
                    <Typography variant='h6'>Your previous records</Typography>
                    <List>
                        {records.map((element, i) => 
                        <ListItem>
                            <Controls.Button
                            text={element.record_date}
                            fullWidth
                            key={i}
                            />
                        </ListItem>
                        )}
                    </List>
                </Paper>
            </Box>
        </Box>
    )
};
