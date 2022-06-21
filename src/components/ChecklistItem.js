import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormHelperText, Paper, Radio, RadioGroup, TextareaAutosize, Tooltip, Typography, useMediaQuery, Zoom } from '@mui/material';
import { grey, green, red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import { UseForm } from './UseForm';
import { useTheme } from '@mui/material/styles';



const ChecklistItem = forwardRef((props, ref) => {


    // Theme Media Query
    const theme = useTheme();
    const isSS = useMediaQuery(theme.breakpoints.down('sm'));
    

    // Validation
    const validate = ( fieldValues = formData) => {
        let temp = {...errors}
        if('status' in fieldValues)
        temp.status = fieldValues.status ? "" : "Required"
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
            return Object.values(temp).every(x => x === "")
    }
    
    // Props
    const { initialItemValues, updatedValues } = props;
    
    // Forms
        const { formData, setFormData, errors, setErrors, handleInputChange } = UseForm(initialItemValues, true, validate);
        const { id, description, status, comments } = formData;
        
    useImperativeHandle(ref, () => ({
        requestValues() {
            updatedValues(formData)
            validate() ? setHelperText("") : setHelperText(errors.status)
        }
    }));
    
    // Description
    const [background, setBackground] = useState(grey[100])
    
    // Status
    const [value, setValue] = useState(status);
    const [helperText, setHelperText] = useState("");
    
    const handleRadioChange = (e) => {
        setValue(e.target.value);
        handleInputChange(e)
    };
    
    // Comments
    // Window State
    const [open, setOpen] = useState(false);
    // Temporary Value
    const [tempValue, setTempValue] = useState(formData)
    
    
    // Tooltip child Button component
    const TooltipButton = forwardRef((props, ref) => 
        <Button 
        //  Spread the props to the underlying DOM element.
        {...props}
        ref={ref}
        sx={isSS
            ? { fontSize: '0.6rem', minWidth: 85 }
            : { fontSize: '0.7rem', minWidth: 105 }}
        variant="contained"
        onClick={handleOpen}
        startIcon={<CommentIcon />}
        >comment</Button>
    );
    
    
    const handleOpen = () => {
        setTempValue(formData)
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setFormData(tempValue);
        handleClose();
    }

    
    useEffect(() => {
        value ? setHelperText("") : setHelperText(errors.status)
        console.log(value)
        if (value === "passed")
        setBackground(green[100])
        else if (value === "failed")
        setBackground(red[100])
    },[value, errors])
    

    return (
        <FormControl 
        sx={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}
        >
            <Container 
            disableGutters
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 40, minWidth: 100, m: 0.5, borderRadius: 2, bgcolor: background, px: isSS ? 1 : 2 }}
            >
                <Typography
                sx={isSS
                    ? { fontSize: '0.8rem' }
                    : { px: 1 }}
                variant='body1'
                >
                    {description}
                </Typography>
            </Container>
            <Container
            disableGutters
            sx={{ width: 80 }}
            >
                <RadioGroup
                sx={{ flexWrap: 'nowrap' }}
                value={value}
                onChange={handleRadioChange}
                row
                >
                    <FormControlLabel
                    sx={{ justifyContent: 'center', flexDirection: 'column-reverse', mx: 1 }}
                    value="passed"
                    control={
                        <Radio name='status' id={id} sx={{ p: 0, mb: 0.5 }} color='success'/>
                    } 
                    label="yes"
                    />
                    <FormControlLabel
                    sx={{ justifyContent: 'center', flexDirection: 'column-reverse', mx: 1 }}
                    value="failed"
                    control={
                        <Radio name='status' id={id} sx={{ p: 0, mb: 0.5 }} color='error'/>
                    } 
                    label="no"
                    />
                </RadioGroup>
                <FormHelperText error={helperText ? true : false} sx={{ pb: 1, mt: 0 }}>
                    {helperText}
                </FormHelperText>
            </Container>
            <Tooltip TransitionComponent={Zoom} title={!open?comments:""} placement="left" arrow>
                <TooltipButton/>
            </Tooltip>
            {/* Dialog */}
            <Dialog
            sx={{ '& .MuiDialog-paper': { px: 2 } }}
            fullWidth
            maxWidth='md'
            open={open} 
            onClose={handleCancel}
            >
                {/* Dialog Title */}
                <DialogTitle sx={{ px: 0 }}>Add comment on:</DialogTitle>
                <Box sx={{ justifyContent: 'center', display: 'flex' }}>
                    <Paper sx={{ p: 1, width: isSS ? '100%' : '80%' }}>
                        <DialogContent sx={{ p: 0 }}>
                            {/* Dialog Message */}
                            <DialogContentText gutterBottom>{description}</DialogContentText>
                        </DialogContent>
                        {/* Dialog Input */}
                        <TextareaAutosize
                        style={{ width: '100%' }}
                        autoFocus
                        id={id}
                        name="comments"
                        value={comments}
                        onChange={handleInputChange}
                        minRows={4}
                        maxLength={300}
                        placeholder="write your comment here"
                        />
                    </Paper>
                </Box>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </FormControl>
    )
});
export default ChecklistItem;