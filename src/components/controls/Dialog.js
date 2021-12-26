import React, { useState } from 'react';
import Controls from './Controls';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { ListItem as MuiListItem, ListItemText} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {

  const { buttonText, buttonVariant, dialogTitle, dialogText, label, name, type, value, onChange, handleConfirm } = props;

  const [open, setOpen] = useState(false);



  const handleOpen = () => {setOpen((prevState) => !prevState)}

  async function handleSubmit(e)  {
    
      e.preventDefault()
      try {
        if(type==="password")
        await handleConfirm(e)
        // console.log(handleConfirm(e))
      } catch(err) {
        console.log("Wrong password")
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
      <ListItemText primary={value}/>
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
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogText}
          </DialogContentText>
          <Controls.Input
          autoFocus
          name={name}
          type={type}
          value={value}
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
}
