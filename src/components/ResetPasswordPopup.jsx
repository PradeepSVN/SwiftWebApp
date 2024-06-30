import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {resetPasswordObj} from '../utils/apiRequestData';

export default function ResetPasswordDialog({openPopup,handleCloseOpenPopup,handleResetPassword}) {
  const [open, setOpen] = React.useState(openPopup);
  const [payload, setPayload] = React.useState(resetPasswordObj);

  const handleResetPasswordClick = () => {
    handleResetPassword(payload);
  };

  const handleClose = () => {
    handleCloseOpenPopup();
  };

  const handleChange = (e) => {   
    const target = e.target
    setPayload((cre) => ({ ...cre, [target.id]: target.value }))
  }

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={openPopup.openDialog}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* To subscribe to this website, please enter your email address here. We
            will send updates occasionally. */}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleChange} 
          />
         {openPopup.showErrorMsg? <label style={{color:'red', fontSize:'12px'}}>Password must be at least 8 characters long, contain a digit, a lowercase letter, an uppercase letter, and a special character</label>:""}
            <TextField
            autoFocus
            required
            margin="dense"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
        <Button type="button" onClick={handleResetPasswordClick}>Reset</Button>
        <Button onClick={handleClose}>Cancel</Button>          
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}