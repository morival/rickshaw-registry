import React, { forwardRef, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem as MuiListItem, Paper, Slide, useMediaQuery, useTheme } from '@mui/material';
import Controls from './controls/Controls';
import Content from './content/ProfileDescriptions';
import { Form, UseForm } from './UseForm';
import { useAuth } from './context/AuthContext';



const Transition = forwardRef((props, ref) =>
   <Slide direction="up" ref={ref} {...props} />
);


export default function AdminUserItem({ user }) {


    //  Theme Media Query
    const theme = useTheme();
    const isSS = useMediaQuery(theme.breakpoints.down('sm'));
    

    // Validation
    const validate = (  fieldValues = formData ) => {
        let temp = {...errors}
        const validEmail = /.+@.+..+/;
        const validNumber = /^\d+.{10,20}$/;
        const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        if('name' in fieldValues)
        temp.name = fieldValues.name ? "" : "Field required"
        if('email' in fieldValues)
        temp.email = validEmail.test(fieldValues.email) ? "" : "Invalid email"
        if('phoneNumber' in fieldValues)
        temp.phoneNumber = validNumber.test(fieldValues.phoneNumber) ? "" : "The number is too short"
        if('password' in fieldValues)
        temp.password = validPassword.test(fieldValues.password) ? "" : "Invalid password: 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"
        setErrors({
            ...temp
        })
        if(fieldValues === formData)
        return Object.values(temp).every(x => x === "")
    }


    // Auth Context
    const { testEmailAndPhoneNo, updateUser, findUsers } = useAuth()
    // Forms
    const { formData, setFormData, errors, setErrors, handleInputChange } = UseForm(user, true, validate)

    // Dialog Window State
    const [open, setOpen] = useState(false);

    const menuItems=["user", "admin"]

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setFormData(user);
        setErrors({})
        handleClose();
    };

    async function handleSubmit(e) {
        e.preventDefault();
        // check for duplicate email or phone number in DB
        const res = await testEmailAndPhoneNo(formData)
        console.log(res)
        if (res && res.status === 203) {
            res.data
            .filter((element) => !Object.values(element).includes("ok"))
            .forEach((element) => setErrors(element))
        } else {
            const res = await updateUser(formData, "admin")
            if (res && res.status < 300) {
                console.log(res)
                findUsers();
                handleClose();
            }
        }
    }

    return (
        <MuiListItem
        sx={{ p: isSS ? '8px 0' : '8px 8px' }}
        >
            <Controls.Button
                text={user.name}
                // color='warning'
                variant='text'
                onClick={handleOpen}
            />
            
            {/* Dialog Window */}
            <Dialog
                fullScreen={ isSS ? true : false }
                open={open}
                onClose={handleCancel}
                TransitionComponent={Transition}
                aria-describedby="alert-dialog-slide-description"
            >
                <Form 
                    style={ isSS ? { display: 'flex', flexDirection: 'column', alignItems: 'center' } : null}
                    onSubmit={handleSubmit}
                >
                    {/* Dialog Title */}

                    <DialogTitle sx={{ textAlign: 'center' }}>{user.name}</DialogTitle>
                    <DialogContent sx={{ px:2, py: 0.2, maxWidth: 300 }}>
                        <Paper sx={{ p: 1 }}>
                            {/* Dialog Message */}
                            <DialogContentText id="alert-dialog-slide-description">
                                id: {user._id}
                            </DialogContentText>
                            {/* Dialog Input */}
                            {Content.profileDetails
                            .filter(element => element.name !== "password" && element.name !== "confirmPassword")
                            .map((element, i) => {
                                return (
                                    <Controls.Input
                                        name={element.name}
                                        label={element.label}
                                        type={element.type}
                                        value={formData[element.name] || ""}
                                        error={errors[element.name]}
                                        onChange={handleInputChange}
                                        fullWidth
                                        autoFocus={i === 0 ? true : false}
                                        key={i}
                                    />
                                )
                            })}
                            <Controls.Select
                                name="acc_type"
                                label="Account Type"
                                menuItems={menuItems}
                                value={formData["acc_type"] || ""}
                                error={errors["acc_type"]}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Paper>
                    </DialogContent>
                    <DialogActions sx={{ width: '100%', maxWidth: 300 }}>
                    <Button onClick={handleCancel}>Cancel</Button>
                        <Button type="submit" color={errors.description ? "error" : "primary"}>Save</Button>
                    </DialogActions>
                </Form>
            </Dialog>
        </MuiListItem>
    )
};
