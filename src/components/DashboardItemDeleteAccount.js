import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem as MuiListItem, ListItemText, Slide, useMediaQuery} from '@mui/material';
import Controls from './controls/Controls';
import { Form } from './UseForm';
import { useTheme } from '@mui/material/styles';



const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const AlertDialogSlide = forwardRef(({ onSubmit }, ref) => {
  
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Dialog Window State
  const [open, setOpen] = useState(false);

  // Checkbox State for Account deletion
  const [checked, setChecked] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      handleOpen: handleOpen
    };
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setChecked(false)
    setOpen(false);
  }

  const handleChange = (e) => {
      setChecked(e.target.value)
  }

  async function handleSubmit(e) {
      e.preventDefault()
      try {
        if (checked) {
          const res = await onSubmit(e)
          console.log(res)
        }
      } catch (err) {
        if (err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(`Error: ${err.message}`)
        }
      }
  }

  
  return (
    <MuiListItem
    sx={isSmallScreen
        ? { p: '8px 0' }
        : {  }}
    >
        {/* Item Label */}
        <ListItemText
          sx={isSmallScreen
            ? { minWidth: 100 }
            : { minWidth: 135 }}
          primary="Delete Account"
          primaryTypographyProps={isSmallScreen
            ? { fontWeight: 'bold', align: 'right', fontSize: '0.8rem' }
            : { fontWeight: 'bold', align: 'right', px: 1 }}
        />
        {/* Item Value */}
        <ListItemText
          sx={{ width: '100%' }}
          primary="Permanently delete your Rickshaw account"
          primaryTypographyProps={isSmallScreen
            ? { fontSize: '0.8rem', p: '0 5px'  }
            : { px: 3 }}
        />
        {/* Item Delete Button */}
        <Controls.Button 
          sx={{ minWidth: 70 }}
          color="error"
          onClick={handleOpen}
          text="Delete"
        />

        {/* Dialog Window */}
        <Dialog
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-describedby="alert-dialog-slide-description"
        >
            <Form onSubmit={handleSubmit}>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogContent sx={{ maxWidth: 260 }}>
                    <DialogContentText id="alert-dialog-slide-description">
                    When you delete your account, you won't be able to retrieve the content that you stored
                    </DialogContentText>
                    <Controls.Checkbox
                      label="check this box to confirm you want to delete your account"
                      name="delete"
                      value={checked}
                      onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit" color={checked ? "primary" : "error"}>Confirm</Button>
                </DialogActions>
            </Form>
        </Dialog>
    </MuiListItem>
  );
});

export default AlertDialogSlide;
