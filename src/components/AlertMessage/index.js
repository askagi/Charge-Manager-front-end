import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AlertMessage({
  open, setOpen, titleMessage,
  backGroundDeleteCharge, setColorDeleteCharge,
  setBackGroundDeleteCharge, colorDeleteCharge
}) {

  const handleClose = (event, reason) => {

    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setColorDeleteCharge('');
    setBackGroundDeleteCharge('');
  };

  return (
    <Stack spacing={2}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleClose}
          severity={colorDeleteCharge === '#AE1100' ? "error" : "success"}
          sx={{
            width: '100%',
            backgroundColor: backGroundDeleteCharge ? backGroundDeleteCharge : '#C3D4FE',
            color: colorDeleteCharge ? colorDeleteCharge : '#243F80',
            fontSize: 16
          }}>
          {titleMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
