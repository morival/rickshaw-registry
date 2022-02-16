import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, TextareaAutosize, Tooltip, Typography, Zoom } from '@mui/material';
import { green, red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { UseForm } from '../UseForm';


export default function ChecklistItem(props) {
    
    const { initialItemValues } = props;
    

    // Validation
    const validate = ( fieldValues = formData) => {
        let temp = {...errors}
        if('status' in fieldValues)
        temp.status = fieldValues.status ? "" : "This field is required."
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
        return Object.values(temp).every(x => x === "")
    }


    const { formData, setFormData, errors, setErrors, handleInputChange } = UseForm(initialItemValues, true, validate);
    
    const { id, description, status, comments } = formData;
    

    // Description
    const [background, setBackground] = useState(null)
    
    // Status
    const [value, setValue] = useState(status);
    
    const handleRadioChange = (e) => {
        setValue(e.target.value);
        handleInputChange(e)
        console.log(e.target.id)
    };
    
    // Comments
    const [open, setOpen] = useState(false);
    const [tempValue, setTempValue] = useState(formData)
    
    
    // Tooltip child component
    const MyComponent = React.forwardRef(function MyComponent(props, ref) {
        //  Spread the props to the underlying DOM element.
        return <Button 
        {...props}
        ref={ref}
        sx={{ my: 0.5, maxWidth: 100 }}
        size="small"
        color="warning"
        variant="outlined"
        onClick={handleClickOpen}
        // text="comment (optional)"
        >comment</Button>
    });
    
    
    const handleClickOpen = () => {
        setTempValue(formData)
        setOpen(true);
        // console.log(tempValue)
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setFormData(tempValue);
        handleClose();
    }

    
    useEffect(() => {
        if (value === "true")
        setBackground(green[100])
        else if (value === "false")
        setBackground(red[100])
        // console.log(errors)
    },[value])

    return(
        <FormControl 
        sx={{ width: '100%', flexDirection: 'row' }}
        >
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
                control={<Radio name='status' id={id} sx={{ p: 0 }} color='success'/>} 
                label="yes"
                />
                <FormControlLabel
                sx={{ justifyContent: 'center', flexDirection: 'column-reverse', ml: 0 }}
                value="false" 
                control={<Radio name='status' id={id} sx={{ p: 0 }} color='error'/>} 
                label="no"
                />
            </RadioGroup>
            <Tooltip TransitionComponent={Zoom} title={!open?comments:""} placement="left" arrow>
                <MyComponent/>
            </Tooltip>
            <Dialog
            sx={{ '& .MuiDialog-paper': { p: 2 } }}
            fullWidth
            maxWidth='md'
            open={open} 
            onClose={handleCancel}
            >
                <DialogTitle sx={{ p: 0 }}>Add comment on:</DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    <DialogContentText>{description}</DialogContentText>
                </DialogContent>
                <TextareaAutosize
                id={id}
                name="comments"
                value={comments}
                onChange={handleInputChange}
                minRows={4}
                maxLength={300}
                placeholder="write your comment here"
                />
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </FormControl>
    )
    
};
