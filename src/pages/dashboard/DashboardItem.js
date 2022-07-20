import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem as MuiListItem, ListItemText, Paper, Slide, useMediaQuery} from '@mui/material';
import Controls from 'components/controls/Controls';
import { Form } from 'components/UseForm';
import { useTheme } from '@mui/material/styles';



const Transition = forwardRef((props, ref) =>
   <Slide direction="up" ref={ref} {...props} />
);



const AlertDialogSlide = forwardRef((props, ref) => {
  

  // Theme Media Query
  const theme = useTheme();
  const isSS = useMediaQuery(theme.breakpoints.down('sm'));
  // const isMS = useMediaQuery(theme.breakpoints.up('md'));

  
  // Props
  const { dialogTitle, dialogText, label, name, type, defaultValue, value, error, onChange, onSubmit, onCancel, closeDialog } = props;

  // Button text
  const buttonValue = name === "password" ? "*****" : !defaultValue ? "This field is empty" : defaultValue;

  // Dialog Window State
  const [open, setOpen] = useState(false);

  // Ref Open Dialog Window from Parent Component
  useImperativeHandle(ref, () => {
    return {
      handleOpen: handleOpen
    };
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    handleClose();
  };

  async function handleSubmit(e) {
      e.preventDefault();
      try {
        if (!error) {
          const res = await onSubmit(e)
          if (res && res.status < 300)
          handleClose();
        }
      } catch(err) {
        if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(`Error: ${err.message}`)
        }
      }
  }

  useEffect(() => {
    const handleClose = () => {
      setOpen(false);
    };
    handleClose();
  },[closeDialog])


  return (
    <MuiListItem
      sx={{ p: isSS ? '8px 0' : '8px 8px' }}
      // hide component if label is missing
      style={label ? undefined : { display: 'none' }}
    >
      {/* Item Label */}
      <ListItemText
        sx={{ minWidth: isSS ? 100 : 135, width: '35%' }}
        primary={label}
        primaryTypographyProps={{ fontWeight: 'bold', align: 'right', fontSize: isSS ? '0.8rem' : null, px: 1 }} />
      {/* Item Value Button */}
      <Controls.Button 
        sx={{ minWidth: 70, width: '65%', textTransform: 'none' }}
        text={buttonValue}
        variant={defaultValue || name === "password" ? "contained" : "outlined"}
        color="primary"
        onClick={handleOpen} />

      {/* Dialog Window */}
      <Dialog
        open={open}
        onClose={handleCancel}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <Form onSubmit={handleSubmit}>
          {/* Dialog Title */}
          <DialogTitle>{dialogTitle ? dialogTitle : "Update " + label}</DialogTitle>
          <DialogContent sx={{ px: 2, py: 0.2, maxWidth: 260 }}>
            <Paper sx={{ p: 1 }}>
              {/* Dialog Message */}
              <DialogContentText id="alert-dialog-slide-description">
                {dialogText}
              </DialogContentText>
              {/* Dialog Input */}
              <Controls.Input
                autoFocus
                label={label}
                name={name}
                type={type}
                value={value}
                error={error}
                onChange={onChange} />
            </Paper>
          </DialogContent>
          {/* Dialog Confirm/Cancel Buttons */}
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit" color={error ? "error" : "primary"}>Save</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </MuiListItem>
  );
});

export default AlertDialogSlide;
