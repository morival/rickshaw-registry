import React, { forwardRef, useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, ListItem, Paper, Slide, Typography, useMediaQuery } from '@mui/material';
import RecordItemPDF from './RecordItemPDF';
import Controls from './controls/Controls';
import { grey, green, red } from '@mui/material/colors';
import { useAuth } from './context/AuthContext';
import { useTheme } from '@mui/material/styles';



const Transition = forwardRef((props, ref) =>
   <Slide direction="up" ref={ref} {...props} />
);
  




export default function RecordItem({ record, onDelete }) {
    
    
    // Theme Media Query
    const theme = useTheme();
    const isSS = useMediaQuery(theme.breakpoints.down('sm'));
    
    // Auth Context
    const { user, recordId, setRecordId } = useAuth();
    
    // Dialog Window State
    const [open, setOpen] = useState(false);
    
    // Dialog Window PDF
    const [openPDF, setOpenPDF] = useState(false);
    
    // Checkbox State for Record deletion
    const [checked, setChecked] = useState(false)
    

    // Handlers
    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setChecked(false);
        setOpen(false);
        setOpenPDF(false)
    };
    
    const handlePrint = () => {
        setChecked(false);
        setOpen(false);
        setOpenPDF(true);
    }
    
    const handleChange = (e) => {
        setChecked(e.target.value);
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
    

    // Formating Time & Date
    function recordDate(data) {
        const newDate = new Date(data.record_date);
        return `recorded on ${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()} at ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
    } 
    const recordedOnDate = recordDate(record)

    useEffect(() => {
        if (recordId === record._id) {
            handleOpen();
            setRecordId(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return (
        <ListItem sx={{ px: isSS ? 0 : 4 }}>
            <Controls.Button
                text={recordedOnDate}
                onClick={handleOpen}
                fullWidth
            />
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{sx: { width: '100%', maxWidth: '800px', m: isSS ? 0 : null }}}
                TransitionComponent={Transition}
                scroll='paper'
                aria-labelledby='record-dialog-title'
                aria-describedby='record-dialog-description'
            >
                <DialogTitle sx={{ textAlign: 'center' }} id='record-dialog-title'>
                    Rickshaw Safety Checklist
                </DialogTitle>
                <DialogContent sx={{ px: isSS ? 2 : 3, py: 0.2 }}>
                        <Typography variant='h6' align='center'>{user.name}</Typography>
                        <Typography paragraph align='center'>{recordedOnDate}</Typography>
                    <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                        <Paper sx={{ p: 1, maxWidth: '750px', width: '100%' }}>
                            <Grid container columnSpacing={0} sx={{ my: 0.5, alignItems: 'center', fontWeight: 'bold', fontSize: isSS ? '13px' : '18px' }}>
                                <Grid item xs={5} sx={{  }}><Typography variant='p'>Description</Typography></Grid>
                                <Grid item xs={1.4} sx={{  }}><Typography variant='p'>Status</Typography></Grid>
                                <Grid item xs={5.6} sx={{  }}><Typography variant='p'>Comments</Typography></Grid>
                            </Grid>
                            {record.checklist.map((element, i) =>
                            <Grid container columnSpacing={0} sx={{ my: 0.5, alignItems: 'center', fontSize: isSS ? '13px' : '18px', backgroundColor: grey[100] }} key={i}>
                                <Grid item xs={5}>
                                    <Typography variant='p'>{element.description}</Typography>
                                </Grid>
                                <Grid item xs={1.4}>
                                    <Typography variant='p' sx={{ color: element.status === "passed" ? green[800] : red[800] }}>
                                        {element.status}
                                    </Typography>
                                </Grid>
                                <Grid item xs={5.6}>
                                    {element.comments?<Typography variant='p' sx={{ fontStyle: 'oblique' }}>({element.comments})</Typography>:null}
                                </Grid>
                            </Grid>
                            )}
                        </Paper>
                    </Box>
                    <Controls.Checkbox
                        sx={{ pt: 1 }}
                        labelSX={{ fontSize: '12px' }}
                        label="check this box to confirm you want to delete this record"
                        value={checked}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions sx={{}}>
                    <Button onClick={handlePrint}>Print</Button>
                    {checked ? <Button id={record._id} onClick={handleDelete}>Delete</Button> : null}
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openPDF}
                onClose={handleClose}
                PaperProps={{sx: { height: '100%', width: '100%', maxWidth: 'lg', m: isSS ? 0 : null }}}
                TransitionComponent={Transition}
                scroll='paper'
            >
                <RecordItemPDF checklist={record.checklist} recordedOnDate={recordedOnDate} user={user}/>
                <DialogActions sx={{}}>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </ListItem>
    );
};
