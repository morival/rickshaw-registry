import React, { forwardRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem as MuiListItem, ListItemText, Paper, Slide, useMediaQuery, useTheme } from '@mui/material';
import Controls from './controls/Controls';
import { Form, UseForm } from './UseForm';



const Transition = forwardRef((props, ref) =>
   <Slide direction="up" ref={ref} {...props} />
);


export default function DescriptionItem({ description, updateDescription }) {


    //  Theme Media Query
    const theme = useTheme();
    const isSS = useMediaQuery(theme.breakpoints.down('sm'));


    const validate = ( fieldValues = formData) => {
        let temp = {...errors}
        if('description' in fieldValues)
        temp.description = fieldValues.description ? "" : "Field required"
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
            return Object.values(temp).every(x => x === "")
    }
    

    // Forms
    const { formData, setFormData, errors, setErrors, handleInputChange } = UseForm(description, true, validate);

    // Dialog Window State
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    
      const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setFormData(description);
        handleClose();
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (!errors.description) {
                const res = await updateDescription(formData)
                console.log(res)
                if (res && res.status < 300)
                    handleClose();
              }
        } catch (err) {
            if(err.response){
                console.log(err.response.data)
                console.log(err.response.status)
                console.log(err.response.headers)
            } else {
                console.log(`Error: ${err.message}`)
            }
        }
    };


    return (
        <MuiListItem
            sx={{ p: isSS ? '8px 0' : '8px 8px' }}
        >
            {/* Item Label */}
            <ListItemText
                sx={{ minWidth: isSS ? 100 : 135 }}
                primary={description.description}
                primaryTypographyProps={{ fontWeight: 'bold', align: 'right', fontSize: isSS ? '0.8rem' : null, px: isSS ? null : 1 }}
            />
            {/* Item Change/Add Button */}
            <Controls.Button 
                sx={{ minWidth: 70 }}
                text="Change"
                color="primary"
                onClick={handleOpen}
            />

            {/* Dialog Window */}
            <Dialog
                open={open}
                onClose={handleCancel}
                TransitionComponent={Transition}
                aria-describedby="alert-dialog-slide-description"
            >
                <Form onSubmit={handleSubmit}>
                    {/* Dialog Title */}
                    <DialogTitle>Update Description</DialogTitle>
                    <DialogContent sx={{ px:2, py: 0.2, maxWidth: 260 }}>
                        <Paper sx={{ p: 1 }}>
                            {/* Dialog Message */}
                            <DialogContentText id="alert-dialog-slide-description">
                                dialog text
                            </DialogContentText>
                            {/* Dialog Input */}
                            <Controls.Input
                                autoFocus
                                name="description"
                                value={formData.description}
                                error={errors.description}
                                onChange={handleInputChange}
                            />
                        </Paper>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="submit" color={errors.description ? "error" : "primary"}>Save</Button>
                    </DialogActions>
                </Form>
            </Dialog>
        </MuiListItem>
    )
};
