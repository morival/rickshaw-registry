import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import Controls from './Controls';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { ListItem as MuiListItem, ListItemText, Typography} from '@mui/material';
import { Form } from '../UseForm';

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
    // hide component if label is missing
    style={label?undefined:{display:"none"}}>
      <ListItemText 
      primary={label}
      sx={{ maxWidth: 150 }}
      />
      <ListItemText 
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
            <Button onClick={handleSubmit} type="submit" color={error?"error":"primary"}>Confirm</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </MuiListItem>
  );
});

export default AlertDialogSlide;