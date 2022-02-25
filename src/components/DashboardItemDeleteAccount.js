import React, { useState, forwardRef, useImperativeHandle } from 'react';
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

  const { dialogTitle, dialogText, checkboxLabel, label, name, defaultValue, onSubmit } = props;

  const [open, setOpen] = useState(false);

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
    setOpen(false);
  };

  const handleCancel = () => {
    setChecked(false)
    handleClose();
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
        //   if (res && res.status < 300)
        //   handleClose()
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

//   useEffect(() => {
//     const handleClose = () => {
//       setOpen(false);
//     };
//     handleClose();
//   },[closeDialog])


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
        : { minWidth: 130 }}
        primary={label}
        primaryTypographyProps={isSmallScreen
        ? { fontSize: '0.8rem' }
        : { px: 1 }}
        />
        {/* Item Value */}
        <ListItemText
        sx={{ width: '100%' }}
        primary={defaultValue}
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
                    <Controls.Checkbox
                    label={checkboxLabel}
                    name={name}
                    value={checked}
                    onChange={handleChange}
                    />
                </DialogContent>
                {/* Dialog Confirm/Cancel Buttons */}
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button type="submit" color={checked ? "primary" : "error"}>Confirm</Button>
                </DialogActions>
            </Form>
        </Dialog>
    </MuiListItem>
  );
});

export default AlertDialogSlide;
