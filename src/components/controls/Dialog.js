import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Controls from './Controls';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { ListItem as MuiListItem, ListItemText} from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide = forwardRef((props, ref) => {

  const { buttonText, buttonVariant, dialogTitle, dialogText, label, name, type, value, error, info, onChange, handleConfirm } = props;

  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      handleOpen: handleOpen
    };
  });

  const handleOpen = () => {setOpen((prevState) => !prevState)}

  async function handleSubmit(e)  {
      // const currentUser = localStorage.getItem('user')
      e.preventDefault()
      try {
        // if(info==="basic") {
        //   console.log(currentUser.password)
          await handleConfirm(e)
        // }
      } catch(err) {
        // console.log("Wrong password")
        if(err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(`Error: ${err.message}`)
        }
      } finally {
        handleOpen()
      }
  }

  return (
    <MuiListItem>
      <ListItemText 
      primary={label}
      sx={{ maxWidth: 150 }}
      />
      <ListItemText primary={name==="password"?"*****":value}/>
      <Controls.Button 
      variant={buttonVariant} 
      onClick={handleOpen}
      text={buttonText}
      />
      <Dialog
        open={open}
        onClose={handleOpen}
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent sx={{ maxWidth: 260 }}>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogText}
          </DialogContentText>
          <Controls.Input
          autoFocus
          name={name}
          type={type}
          value={value}
          error={error}
          onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen}>Cancel</Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </MuiListItem>
  );
});

export default AlertDialogSlide;
