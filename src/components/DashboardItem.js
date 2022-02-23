import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem as MuiListItem, ListItemText, Slide, useMediaQuery} from '@mui/material';
import Controls from './controls/Controls';
import { Form } from './UseForm';
import { useTheme } from '@mui/material/styles';



const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const AlertDialogSlide = forwardRef((props, ref) => {
  
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const { dialogTitle, dialogText, label, name, type, defaultValue, value, error, onChange, onSubmit, onCancel, closeDialog } = props;

  const [open, setOpen] = useState(false);

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
  }

  async function handleSubmit(e) {
      e.preventDefault()
      try {
        if (!error) {
          const res = await onSubmit(e)
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
    sx={isSmallScreen
        ? { p: '8px 0' }
        : {  }}
    // hide component if label is missing
    style={label ? undefined : { display: 'none' }}
    >
      <ListItemText
      sx={isSmallScreen
        ? { minWidth: 100 }
        : { minWidth: 130 }}
      primary={label}
      primaryTypographyProps={isSmallScreen
        ? { fontSize: '0.8rem' }
        : { px: 1 }}
      />
      <ListItemText
      sx={{ width: '100%' }}
      primary={name==="password"?"*****":defaultValue}
      primaryTypographyProps={isSmallScreen
        ? { fontSize: '0.8rem', p: '0 5px'  }
        : { px: 3 }}
      // set error message
      // secondary={error?<Typography variant="subtitle2" color="error">{error}</Typography>:null}
      />
      <Controls.Button 
      sx={{ minWidth: 70 }}
      color="primary"
      onClick={handleOpen}
      text={defaultValue||name==="password"?"Change":"Add"}
      />
      <Dialog
        open={open}
        onClose={handleCancel}
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
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit" color={error?"error":"primary"}>Confirm</Button>
          </DialogActions>
        </Form>
      </Dialog>
    </MuiListItem>
  );
});

export default AlertDialogSlide;
