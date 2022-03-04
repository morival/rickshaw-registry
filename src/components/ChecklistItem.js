import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormHelperText, Radio, RadioGroup, TextareaAutosize, Tooltip, Typography, useMediaQuery, Zoom } from '@mui/material';
import { grey, green, red } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import { UseForm } from './UseForm';
import { useTheme } from '@mui/material/styles';



const ChecklistItem = forwardRef((props, ref) => {

    const theme = useTheme();

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    const { initialItemValues, updatedValues } = props;
    
    useImperativeHandle(ref, () => ({
        requestValues() {
            updatedValues(formData)
            validate() ? setHelperText("") : setHelperText(errors.status)
        }
    }));

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


    const { formData, setFormData, errors, setErrors, handleInputChange } = UseForm(initialItemValues, true, validate);
    
    const { id, description, status, comments } = formData;
    

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
    const [open, setOpen] = useState(false);
    const [tempValue, setTempValue] = useState(formData)
    
    
    // Tooltip child Button component
    const TooltipButton = React.forwardRef(function TooltipButton(props, ref) {
        //  Spread the props to the underlying DOM element.
        return <Button 
        {...props}
        ref={ref}
        sx={isSmallScreen
            ? { fontSize: '0.6rem', minWidth: 85 }
            : { fontSize: '0.7rem', minWidth: 105 }}
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<CommentIcon />}
        >comment</Button>
    });
    
    
    const handleClickOpen = () => {
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
        if (value === "true")
        setBackground(green[100])
        else if (value === "false")
        setBackground(red[100])
    },[value, errors])
    

    return (
        <FormControl 
        sx={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}
        >
            <Container 
            disableGutters
            sx={isSmallScreen
                ? { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 40, minWidth: 100, m: 0.5, borderRadius: 2, bgcolor: background, px: 1 }
                : { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', minHeight: 40, minWidth: 100, m: 0.5, borderRadius: 2, bgcolor: background, px: 2 }}
            >
                <Typography
                sx={isSmallScreen
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
                    value={true}
                    control={
                        <Radio name='status' id={id} sx={{ p: 0, mb: 0.5 }} color='success'/>
                    } 
                    label="yes"
                    />
                    <FormControlLabel
                    sx={{ justifyContent: 'center', flexDirection: 'column-reverse', mx: 1 }}
                    value={false}
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
                autoFocus
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
});
export default ChecklistItem;