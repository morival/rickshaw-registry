import React, { forwardRef, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem as MuiListItem, ListItemText, Paper, Slide, useMediaQuery, useTheme } from '@mui/material';
import Controls from 'components/controls/Controls';
import { useAuth } from 'context/AuthContext';
import { Form, UseForm } from 'components/UseForm';



const Transition = forwardRef((props, ref) =>
   <Slide direction="up" ref={ref} {...props} />
);


export default function DescriptionItem(props) {


    //  Theme Media Query
    const theme = useTheme();
    const isSS = useMediaQuery(theme.breakpoints.down('sm'));


    // Props
    const { description, numberOfDescriptions, onCheckboxChange, showDeleteButton, handleDeleteMany } = props

    // Validation
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
    
    // Auth Context
    const { createDescription, updateDescription, deleteDescription } = useAuth();
    // Forms
    const { formData, setFormData, errors, setErrors, handleInputChange } = UseForm(description, true, validate);
    
    const hasDescription = description.description;


    // Checkbox
    const [checked, setChecked] = useState(false);
    const handleCheckboxChange = (e) => {
        setChecked(!checked)
        onCheckboxChange(e)
    }


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
        setErrors({})
        handleClose();
    };

    async function handleSubmit(e) {
        e.preventDefault();
        validate();
        try {
            // Add New Description
            if (!hasDescription) {
                if (!formData.description)
                    return;
                else {
                    const res = await createDescription(formData)
                    if (res && res.status < 300) {
                        handleCancel();
                    }
                }
            }
            // Edit Description
            else if (!errors.description) {
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

    async function handleDelete() {
        try {
            const res = await deleteDescription(formData)
            console.log(res)
            if (res && res.status < 300)
                    handleClose();
        } catch (err) {
            console.log(`Error: ${err.message}`)
        }
    }
    const deleteManyButton = () => (
        <Controls.Button
            text="Delete Selected"
            color="error"
            onClick={handleDeleteMany}
        />
    )

    useEffect(() => {
        if (hasDescription)
            setChecked(false)
    },[numberOfDescriptions, hasDescription])

    return (
        <MuiListItem sx={{ p: isSS ? '8px 0' : '8px 8px' }}>
            {/* Item Checkbox / Delete Button */}
            {hasDescription 
            ?   <Controls.Checkbox
                    name={description._id}
                    value={checked}
                    onChange={handleCheckboxChange}
                />
            :   showDeleteButton 
                ?   deleteManyButton()
                :   null}
            {/* Item Label */}
            <ListItemText
                sx={{ minWidth: isSS ? 100 : 135 }}
                primary={hasDescription}
                primaryTypographyProps={{ fontWeight: 'bold', align: 'right', fontSize: isSS ? '0.8rem' : null, px: isSS ? null : 1 }}
            />
            {/* Item Change / Add Button */}
            <Controls.Button 
                sx={{ minWidth: 70 }}
                text={hasDescription ? "Change" : "Add New"}
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
                    <DialogTitle>{hasDescription ? "Update Description" : "Add New Description"}</DialogTitle>
                    
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
                        {hasDescription ? <Button onClick={handleDelete}>Delete</Button> : null}
                        <Button type="submit" color={errors.description ? "error" : "primary"}>Save</Button>
                    </DialogActions>
                </Form>
            </Dialog>
        </MuiListItem>
    )
};
