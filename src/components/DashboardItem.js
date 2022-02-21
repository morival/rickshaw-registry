import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import Controls from './controls/Controls';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem as MuiListItem, ListItemText, Slide, Typography} from '@mui/material';
import { Form } from './UseForm';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = forwardRef((props, ref) => {

  const { buttonVariant, dialogTitle, dialogText, label, name, type, defaultValue, value, error, onChange, handleConfirm, closeDialog } = props;

  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      handleOpen: handleOpen
    };
  });

  const handleOpen = () => {
    setOpen(true);
    // if (!value)
    // defineValue(true)
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(e) {
      e.preventDefault()
      try {
        if (!error) {
          const res = await handleConfirm(e)
          console.log(name)
          console.log(res)
          if (res && res.status < 300)
          handleClose()
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
    // sx={{ width: '100%' }}
    // hide component if label is missing
    style={label?undefined:{display:"none"}}
    >
      <ListItemText 
      sx={{ width: 180 }}
      primary={label}
      />
      <ListItemText
    //   sx={{ width: '100%' }}
      primary={name==="password"?"*****":defaultValue}
      // set error message
      secondary={error?<Typography variant="subtitle2" color="error">{error}</Typography>:null}
      />
      <Controls.Button 
      variant={buttonVariant}
      color={error?"warning":"primary"}
      onClick={handleOpen}
      text={value||name==="password"?"Change":"Add"}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <Form onSubmit={handleSubmit}>
          <DialogTitle>{dialogTitle?dialogTitle:"Update "+label}</DialogTitle>
          <DialogContent sx={{ maxWidth: 260 }}>
            <DialogContentText id="alert-dialog-slide-description">
              {dialogText}
            </DialogContentText>
            <Controls.Input
            autoFocus
            label={label}
            name={name}
            type={type}
            value={value}
            error={error}
            onChange={onChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" color={error?"error":"primary"}>Confirm</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </MuiListItem>
  );
});

export default AlertDialogSlide;
