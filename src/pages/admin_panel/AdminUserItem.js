import React, { forwardRef, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem as MuiListItem, Paper, Slide, useMediaQuery, useTheme } from '@mui/material';
import Controls from 'components/controls/Controls';
import Content from 'components/content/ProfileDescriptions';
import { Form, UseForm } from 'components/UseForm';
import { useAuth } from 'context/AuthContext';



const Transition = forwardRef((props, ref) =>
   <Slide direction="up" ref={ref} {...props} />
);


export default function AdminUserItem(props) {


    //  Theme Media Query
    const theme = useTheme();
    const isSS = useMediaQuery(theme.breakpoints.down('sm'));


    // Props 
    const { user, numberOfUsers, onCheckboxChange } = props
    

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
    const { setLoading, testEmailAndPhoneNo, updateUser, findUsers, deleteUser } = useAuth()
    // Forms
    const { formData, errors, setErrors, handleInputChange, resetForm } = UseForm(user, true, validate)

    if (!user)
        console.log("empty user")

    // Checkbox
    const [checked, setChecked] = useState(false);
    const handleCheckboxChange = (e) => {
        setChecked(!checked)
        onCheckboxChange(e)
    }

    // Dialog Window State
    const [open, setOpen] = useState(false);
    // Dialog Checkbox State for user deletion
    const [dChecked, setDChecked] = useState(false);

    const menuItems=["user", "admin"]

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        resetForm();
        setErrors({})
        handleClose();
    };

    const handleChange = (e) => {
        setDChecked(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)
        try {
            // check for duplicate email or phone number in DB
            const res = await testEmailAndPhoneNo(formData)
            if (res && res.status === 203) {
                console.log(res.data)
                setErrors(res.data)
            } else {
                const res = await updateUser(formData, "admin")
                if (res && res.status < 300) {
                    console.log(res)
                    findUsers();
                    handleClose();
                }
            }
        } catch (err) {
            console.log(`Error: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }

    async function handleDelete() {
        console.log(formData)
        setLoading(true)
        try {
            if (dChecked) {
                const res = await deleteUser(formData)
                console.log(res)
                if (res.status < 300)
                    handleClose()
            }
        } catch (err) {
            console.log(`Error: ${err.message}`)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        setChecked(false)
        console.log("useEffect lunched")
    }, [numberOfUsers]);

    return (
        <MuiListItem sx={{ p: isSS ? '8px 0' : '8px 8px' }}>
            {/* Item Checkbox / Delete Button */}
            <Controls.Checkbox
                name={user._id}
                value={checked}
                onChange={handleCheckboxChange}
            />
            {/* Item Name / Change Button */}
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
                        <Controls.Checkbox
                            sx={{ pt: 1 }}
                            labelSX={{ fontSize: '12px' }}
                            label="check this box to confirm you want to delete this record"
                            value={dChecked}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions sx={{ width: '100%', maxWidth: 300 }}>
                    <Button onClick={handleCancel}>Cancel</Button>
                    {dChecked ? <Button id={user._id} onClick={handleDelete}>Delete</Button> : null}
                    <Button type="submit" color={errors.user ? "error" : "primary"}>Save</Button>
                    </DialogActions>
                </Form>
            </Dialog>
        </MuiListItem>
    )
};
