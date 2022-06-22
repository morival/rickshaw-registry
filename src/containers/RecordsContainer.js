import React, { useEffect } from 'react';
import RecordItem from '../components/RecordItem';
import { useAuth } from '../components/context/AuthContext';
import Controls from '../components/controls/Controls';
import { Box, List, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';



export default function RecordsContainer(params) {
    

    // Auth
    const { user, records, setRecords, getUserRecords, deleteRecord } = useAuth()
    
    
    async function findRecords() {
        const filteredRecords = await getUserRecords(user)
        setRecords(filteredRecords.data)
    }


    async function handleDelete(e) {
        const id = e.target.id;
        try {
            const record = records.find(element => element._id === id)
            return await deleteRecord(record)
        } catch (err) {
            console.log(err)
        } finally {
            findRecords();
        }
    }


    useEffect(() => {
        findRecords();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return (
        <Box sx={{ p: 2 }}>
            <h1>Records</h1>
            <Controls.Button
                text="Home"
                component={Link} to={"/"}
            />
            <Controls.Button
                text="Checklist"
                color="warning"
                component={Link} to={"/checklist"}
            />
            <Controls.Button
                text="Dashboard"
                color="success"
                component={Link} to={"/dashboard"}
            />
            <Controls.Button
                text="Admin Panel"
                color="secondary"
                component={Link} to={"/admin"}
            />
            <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                <Paper 
                    sx={{ p: 1, maxWidth: '700px', width: '100%' }}
                    align="center"
                >
                    <Typography variant='h6'>Your previous records</Typography>
                    <List>
                        {records && records.length
                        ?   records.map((element, i) => 
                                <RecordItem
                                    record={element}
                                    onDelete={handleDelete}
                                    key={i}
                                />
                            )
                        :   <Typography paragraph>No records</Typography>
                        }
                    </List>
                </Paper>
            </Box>
        </Box>
    )
};
