import React, {useState} from 'react';
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


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(e)  {
    
      e.preventDefault()
      console.log(handleConfirm(e))
      const promise = await handleConfirm(e)
      try {
        handleClose()
      } catch(err) {
        console.log("Wrong password")
      }
    


    
    // console.log(promise.PromiseStatus)
    // handleClose()
  }

  return (
    <div>
      <Controls.Button 
      variant="outlined" 
      onClick={handleClickOpen}
      text={buttonText}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {dialogText}
          </DialogContentText>
          <Controls.Input
          name={inputName}
          type={inputType}
          value={inputValue}
          onChange={inputOnChange}
          autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
