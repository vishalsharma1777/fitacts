import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { signinActions } from '../../store/signinSlice';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function FeedBack() {
  const [openSnackBar, setOpenSnackBar] = React.useState(false);
  //   const [message,setMessage] = useState('')
  const dispatch = useDispatch();
  let severity = 'success';
  const signinState = useSelector((state) => state.signIn);
  let message = '';

  const handleClickSnackBar = () => {
    setOpenSnackBar(true);
  };
  
  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };
  if (!signinState.siginSuccess && !signinState.signinLoading) {
    handleClickSnackBar();
    dispatch(signinActions.signinLoadingAction(true));
  }

  if (signinState.signinError!==null) {
    severity = 'error';
    message = signinState.signinError.data.message;
  }


  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={openSnackBar}
      autoHideDuration={3000}
      onClose={handleCloseSnackBar}
    >
      <Alert
        onClose={handleCloseSnackBar}
        severity={severity}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default FeedBack;
