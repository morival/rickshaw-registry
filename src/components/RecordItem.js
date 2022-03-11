import React, { forwardRef, useEffect, useState } from 'react';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem, Paper, Slide, Typography } from '@mui/material';
import Controls from './controls/Controls';
// import RecordsServices from '../services/RecordsServices';
import { useAuth } from './context/AuthContext';



const Transition = forwardRef((props, ref) =>
   <Slide direction="up" ref={ref} {...props} />
);
  

  // Formating Time & Date
  function recordDate(data) {
      const newDate = new Date(data.record_date);
      return `recorded on ${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()} 
      at ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
  } 
  


export default function RecordItem({ record, onDelete }) {
    
    const { currentUser, currentRecordId, setCurrentRecordId } = useAuth();

    // Dialog Window State
    const [open, setOpen] = useState(false);

    // Checkbox State for Record deletion
    const [checked, setChecked] = useState(false)


    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setChecked(false)
        setOpen(false);
    };

    const handleChange = (e) => {
        setChecked(e.target.value)
    }

    async function handleDelete(e) {
        try {
            if (checked) {
                const callDelete = await onDelete(e)
                callDelete.status === 200
                ?   handleClose()
                :   console.log(callDelete)
            }
        } catch (err) {
            if (err.response){
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
            console.log(`Error: ${err.message}`)
            }
        }
    }


    useEffect(() => {
        if (currentRecordId === record._id) {
            handleOpen();
            setCurrentRecordId(null)
            console.log('yes')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return (
        <ListItem>
            <Controls.Button
                text={recordDate(record)}
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
                    <Typography variant='p'>{recordDate(record)}</Typography>
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
                    <Controls.Checkbox
                        label="check this box to confirm you want to delete this record"
                        name="name"
                        value={checked}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    {checked ? <Button id={record._id} onClick={handleDelete}>Delete</Button> : null}
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    );
};
