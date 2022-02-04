import { Container, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, TextareaAutosize, Typography } from '@mui/material';
import { green, red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import Controls from './Controls';


export default function ChecklistItem(props) {

    const { item, onChange } = props;

    const { description, status, comments} = item;

    // Description
    const [background, setBackground] = useState(null)

    // Status
    const [value, setValue] = useState(status);
    
    const handleRadioChange = (event) => {
        setValue(event.target.value);
    };
    
    // Comments
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        console.log(item)
    };
    
      const handleClose = () => {
        setOpen(false);
    };


    // Validation
    // const validate = ( fieldValues = formData) => {
    //     let temp = {...errors}
    //    setErrors({
    //         ...temp
    //     })
    //     if(fieldValues === formData)
    //         return Object.values(temp).every(x => x === "")
    // }

    // const { formData, errors, setErrors, handleInputChange } = UseForm(initialValues, true, validate);
    
    useEffect(() => {
        if (value === "true")
        setBackground(green[100])
        else if (value === "false")
        setBackground(red[100])
    },[value])

    return(
        <FormControl sx={{ width: '100%', flexDirection: 'row' }}>
            <Container sx={{ display: 'flex', alignItems: 'center', m: 0.5, borderRadius: 2, bgcolor: background }}>
                <Typography sx={{  }} variant='body1'>{description}</Typography>
            </Container>
            <RadioGroup
            sx={{ flexWrap: 'nowrap' }}
            value={value}
            onChange={handleRadioChange}
            row
            >
                <FormControlLabel
                sx={{ justifyContent: 'center', flexDirection: 'column-reverse', ml: 0 }}
                value="true" 
                control={<Radio sx={{ p: 0 }} color='success'/>} 
                label="yes"
                />
                <FormControlLabel
                sx={{ justifyContent: 'center', flexDirection: 'column-reverse', ml: 0 }}
                value="false" 
                control={<Radio sx={{ p: 0 }} color='error'/>} 
                label="no"
                />
            </RadioGroup>
            <Controls.Button
            sx={{ my: 0.5, maxWidth: 100 }}
            size="small"
            color="warning"
            variant="outlined"
            onClick={handleClickOpen}
            text="comment (optional)"
            />
            <Dialog
            sx={{ '& .MuiDialog-paper': { p: 2 } }}
            fullWidth
            maxWidth='md'
            open={open} 
            onClose={handleClose}
            >
                <DialogTitle sx={{ p: 0 }}>Comment</DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    <DialogContentText>Add comment if required</DialogContentText>
                </DialogContent>
                <TextareaAutosize
                defaultValue={comments}
                onChange={onChange}
                minRows={4}
                maxLength={300}
                placeholder="write your comment here"
                />
            </Dialog>
        </FormControl>
    )
    
};
