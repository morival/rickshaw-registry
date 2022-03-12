import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, ListItem as MuiListItem, ListItemText, Paper, Slide, useMediaQuery} from '@mui/material';
import Controls from './controls/Controls';
import { red } from '@mui/material/colors';
import { Form } from './UseForm';
import { useTheme } from '@mui/material/styles';



const Transition = forwardRef((props, ref) =>
  <Slide direction="up" ref={ref} {...props} />
);



const AlertDialogSlide = forwardRef(({ onSubmit }, ref) => {
  
  
  // Theme Media Query
  const theme = useTheme();
  const isSS = useMediaQuery(theme.breakpoints.down('sm'));


  // Dialog Window State
  const [open, setOpen] = useState(false);

  // Checkbox State for Account deletion
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
    setChecked(false)
    setOpen(false);
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
        }
      } catch (err) {
        if (err.response){
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else {
          console.log(`Error: ${err.message}`)
        }
      }
  }

  
  return (
    <MuiListItem
    sx={{ p: isSS ? '8px 0' : '8px 8px' }}
    >
        {/* Item Label */}
        <ListItemText
          sx={{ minWidth: isSS ? 100 : 135 }}
          primary="Delete Account"
          primaryTypographyProps={{ fontWeight: 'bold', align: 'right', fontSize: isSS ? '0.8rem' : null, px: isSS ? null : 1 }}
        />
        {/* Item Value */}
        <ListItemText
          sx={{ width: '100%' }}
          primary="Permanently delete your Rickshaw account"
          primaryTypographyProps={isSS
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
          onClose={handleClose}
          TransitionComponent={Transition}
          aria-describedby="alert-dialog-slide-description"
        >
            <Form onSubmit={handleSubmit}>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogContent sx={{ px: 2, py: 0.2, maxWidth: 260 }}>
                  <Paper sx={{ p: 1 }}>
                    <DialogContentText 
                      sx={{ color: red[800] }}
                      id="alert-dialog-slide-description"
                    >
                      When you delete your account, you won't be able to retrieve the content that you stored
                    </DialogContentText>
                  </Paper>
                  <Controls.Checkbox
                    sx={{ pt: 1 }}
                    labelSX={{ fontSize: '12px' }}
                    label="check this box to confirm you want to delete your account"
                    value={checked}
                    onChange={handleChange}
                  />
                </DialogContent>
                <DialogActions>
                    {checked ? <Button type="submit">Confirm</Button> : null}
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Form>
        </Dialog>
    </MuiListItem>
  );
});

export default AlertDialogSlide;
