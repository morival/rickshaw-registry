import React, { forwardRef, useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle, Link, Paper, Slide, Typography } from '@mui/material';
import Controls from './controls/Controls';
import { Form, UseForm } from './UseForm';
import { useAuth } from './context/AuthContext';



const Transition = forwardRef((props, ref) =>
   <Slide direction="up" ref={ref} {...props} />
);


const initialValues = {
    email: "",
    confirmEmail: "",
}


export default function ForgotPassword() {


    // Validation
    const validate = ( fieldValues = formData) => {
        let temp = {...errors}
        if ('email' in fieldValues)
            temp.email = (/.+@.+..+/).test(fieldValues.email) ? "" : "Invalid email"
        if ('confirmEmail' in fieldValues)
            temp.confirmEmail = formData.email===fieldValues.confirmEmail ? "" : "Email do not match"
        setErrors({
            ...temp
        })
        if (fieldValues === formData)
            return Object.values(temp).every(x => x === "")
    }


    // Auth Context
    const { testEmail } = useAuth();
    // Forms
    const { formData, setFormData, errors, setErrors, handleInputChange } = UseForm(initialValues, true, validate);


    // Dialog Window State
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setFormData(initialValues);
        setErrors({});
        handleClose();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (validate()) {
                // check if email exists
                console.log(formData)
                const res = await testEmail(formData)
                console.log(res)
                // if (res.status === 202)
                //     setErrors({ email: res.data.message })
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <Typography align="center" sx={{ my: 1 }}>
                <Link href="#" onClick={()=>handleOpen()} underline="none">Forgot your password?</Link>
            </Typography>
            <Dialog
                open={open}
                onClose={handleCancel}
                PaperProps={{sx: { width: '100%', maxWidth: '320px' }}}
                TransitionComponent={Transition}
                aria-labelledby='forgot-dialog-title'
                aria-describedby='forgot-dialog-description'
            >
                <DialogTitle sx={{ textAlign: 'center' }} id='forgot-dialog-title'>
                    Reset your password
                </DialogTitle>
                <DialogContent sx={{ textAlign: 'center', px: 2, py: 0.2 }}>
                    <Box sx={{ alignItems: 'center' }}>
                        <Paper elevation={10} sx={{ p: 2.5, mb: 2.5 }}>
                            <Typography variant='h6'>
                                Enter the email address
                            </Typography>
                            <Typography variant='p'>
                                We will then email you a link to a secure page where you can create a new password.
                            </Typography>
                            <Form onSubmit={handleSubmit}>
                                <Controls.Input
                                    label='Your email address'
                                    name='email'
                                    type='email'
                                    value={formData.email}
                                    error={errors.email}
                                    onChange={handleInputChange}
                                    fullWidth
                                    autoFocus
                                />
                                <Controls.Input
                                    label='Confirm email address'
                                    name='confirmEmail'
                                    type='email'
                                    value={formData.confirmEmail}
                                    error={errors.confirmEmail}
                                    onChange={handleInputChange}
                                    fullWidth
                                />
                                <Box sx={{ display: "flex", flexDirection: "column", rowGap: 1, mt: 2 }}>
                                    <Controls.Button
                                        text="Confirm"
                                        type="submit"
                                        fullWidth
                                    />
                                    <Controls.Button
                                        text="Cancel"
                                        variant="outlined"
                                        onClick={handleCancel}
                                        fullWidth
                                    />
                                </Box>
                            </Form>
                        </Paper>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    )
};
