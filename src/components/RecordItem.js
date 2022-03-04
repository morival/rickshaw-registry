import React, { forwardRef, useState } from 'react';
import { Box, Container, Dialog, DialogContent, DialogContentText, DialogTitle, ListItem, Paper, Slide, Typography } from '@mui/material';
import Controls from './controls/Controls';
import { useAuth } from './context/AuthContext';



const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  


export default function RecordItem({ record }) {
    
    const { currentUser } = useAuth();

    // Formating Time & Date
    function recordDate() {
        const newDate = new Date(record.record_date);
        return `recorded on ${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()} 
        at ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
    } 

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <ListItem>
            <Controls.Button
                text={recordDate()}
                onClick={handleOpen}
                fullWidth
            />
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                scroll='paper'
                aria-labelledby='record-dialog-title'
                aria-describedby='record-dialog-description'
            >
                <DialogTitle sx={{ textAlign: 'center' }} id='record-dialog-title'>
                    Rickshaw Safety Checklist
                </DialogTitle>
                <DialogContent dividers sx={{ textAlign: 'center' }}>
                    <Typography variant='h6'>{currentUser.name}</Typography>
                    <Typography variant='p'>{recordDate()}</Typography>
                    <DialogContentText id='record-dialog-description'>
                    </DialogContentText>
                    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                        <Paper sx={{ p: 1, maxWidth: '550px', width: '100%' }}>
                            {record.checklist.map((element, i) =>
                            <Container key={i}>
                                <Typography variant='p'>{element.description} - </Typography>
                                <Typography variant='p'>{element.status} </Typography>
                                {element.comments?<Typography variant='p'>({element.comments})</Typography>:null}
                            </Container>
                            )}
                        </Paper>
                    </Box>
                </DialogContent>
            </Dialog>
        </ListItem>
    )
};
