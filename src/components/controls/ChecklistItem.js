import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, TextareaAutosize, Tooltip, Typography, Zoom } from '@mui/material';
import { green, red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
// import { UseForm } from '../UseForm';


export default function ChecklistItem(props) {
    
    const { item, onChange } = props;
    
    // const { object } = UseForm(item);
    
    const { id, description, status, comments } = item;
    
    // Description
    const [background, setBackground] = useState(null)
    
    // Status
    const [value, setValue] = useState(status);
    
    const handleRadioChange = (e) => {
        setValue(e.target.value);
        onChange(e)
        console.log(e.target.id)
    };
    
    // Comments
    const [open, setOpen] = useState(false);
    
    
    const handleClickOpen = () => {
        // setObject(item)
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    // Tooltip child
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

    // Validation
    // const validate = ( fieldValues = formData) => {
    //     let temp = {...errors}
    //    setErrors({
    //         ...temp
    //     })
    //     if(fieldValues === formData)
    //         return Object.values(temp).every(x => x === "")
    // }

    
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
            <Tooltip TransitionComponent={Zoom} title={comments} placement="left" arrow>
                <MyComponent/>
            </Tooltip>
            <Dialog
            sx={{ '& .MuiDialog-paper': { p: 2 } }}
            fullWidth
            maxWidth='md'
            open={open} 
            onClose={handleClose}
            >
                <DialogTitle sx={{ p: 0 }}>Add comment on:</DialogTitle>
                <DialogContent sx={{ p: 0 }}>
                    <DialogContentText>{description}</DialogContentText>
                </DialogContent>
                <TextareaAutosize
                id={id}
                name="comments"
                value={comments}
                onChange={onChange}
                minRows={4}
                maxLength={300}
                placeholder="write your comment here"
                />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </FormControl>
    )
    
};
