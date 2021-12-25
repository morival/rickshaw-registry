import React, { useState } from 'react';
import Controls from './Controls';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {

    const { buttonText, dialogTitle, dialogText, inputName, inputType, inputValue, inputOnChange, handleConfirm } = props;

  const [open, setOpen] = useState(false);



  const handleOpen = () => {setOpen((prevState) => !prevState)}

  async function handleSubmit(e)  {
    
      e.preventDefault()
      console.log(handleConfirm(e))
      try {
        await handleConfirm(e)
      } catch(err) {
        console.log("Wrong password")
      } finally {
        handleOpen()
      }
  }

  return (
    <div>
      <Controls.Button 
      variant="outlined" 
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
          name={inputName}
          type={inputType}
          value={inputValue}
          onChange={inputOnChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpen}>Cancel</Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
