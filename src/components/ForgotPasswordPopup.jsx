import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ForogtPasswordDialog({openPopup,handleCloseOpenPopup,handleForgotPassword}) {
  const [open, setOpen] = React.useState(openPopup);
  const [payload, setPayload] = React.useState({email:""});

 

  const handleChange = (e) => {   
    const target = e.target
    setPayload((cre) => ({ ...cre, [target.id]: target.value }))
  }

  const handleClose = () => {
    handleCloseOpenPopup();
  };

  const handleForgotPasswordClick = () => {
    handleForgotPassword(payload);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={openPopup.openDialog}
        onClose={handleClose}
        PaperProps={{
          component: 'form'        
        }}
      >
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent style={{width:'400px'}}>
          <DialogContentText>
            {/* To subscribe to this website, please enter your email address here. We
            will send updates occasionally. */}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={handleChange} 
          />
        </DialogContent>
        <DialogActions>        
          <Button type="button" onClick={handleForgotPasswordClick} >Submit</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}