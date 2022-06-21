import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem as MuiListItem, ListItemText, Paper, Slide, useMediaQuery} from '@mui/material';
import Controls from './controls/Controls';
import { Form } from './UseForm';
import { useTheme } from '@mui/material/styles';



const Transition = forwardRef((props, ref) =>
   <Slide direction="up" ref={ref} {...props} />
);



const AlertDialogSlide = forwardRef((props, ref) => {
  

  // Theme Media Query
  const theme = useTheme();
  const isSS = useMediaQuery(theme.breakpoints.down('sm'));
  // const isMS = useMediaQuery(theme.breakpoints.up('md'));

  
  const { dialogTitle, dialogText, label, name, type, defaultValue, value, error, onChange, onSubmit, onCancel, closeDialog } = props;

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
        sx={{ minWidth: isSS ? 100 : 135 }}
        primary={label}
        primaryTypographyProps={{ fontWeight: 'bold', align: 'right', fontSize: isSS ? '0.8rem' : null, px: isSS ? null : 1 }}
      />
      {/* Item Value */}
      <ListItemText
        sx={{ width: '100%' }}
        primary={name === "password" ? "*****" : defaultValue}
        primaryTypographyProps={isSS
          ? { fontSize: '0.8rem', p: '0 5px' }
          : { px: 3 }}
      // set error message
      // secondary={error?<Typography variant="subtitle2" color="error">{error}</Typography>:null}
      />
      {/* Item Change/Add Button */}
      <Controls.Button 
        sx={{ minWidth: 70 }}
        text={defaultValue || name === "password" ? "Change" : "Add"}
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
                onChange={onChange}
              />
            </Paper>
          </DialogContent>
          {/* Dialog Confirm/Cancel Buttons */}
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit" color={error ? "error" : "primary"}>Confirm</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </MuiListItem>
  );
});

export default AlertDialogSlide;
