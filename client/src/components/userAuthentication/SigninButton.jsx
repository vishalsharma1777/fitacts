import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../apis/userapis';
import { useDispatch } from 'react-redux';
import { signinActions } from '../../store/signinSlice';
import axios from 'axios';


function SigninButton({ signInData, disableButton }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = {
    email: signInData.email,
    password: signInData.password
  };
  const submit = async (event) => {
    event.preventDefault();
    userLogin(data).then((res) => {
      console.log(res);
      dispatch(signinActions.signinLoadingAction(false))
      dispatch(signinActions.signinMessageAction(res.data.message))
      dispatch(signinActions.signinStatusAction(res.status))
      dispatch(signinActions.signedinUserAction(res.data.body.user))
      dispatch(signinActions.siginSuccessAction(true))
      if(res.status==200){
        console.log("vsvsvsd");
        axios.defaults.headers.common['Authorization'] = res.token;
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', res.data.body.user.name);
        navigate(`/dashboard`)
      }
    }).
    catch((err) => {
      console.log(err);
      dispatch(signinActions.signinLoadingAction(false))
      dispatch(signinActions.signinErrorAction(err))
    })
  };

  return (
    <Button
      id='signin-button'
      variant='contained'
      onClick={submit}
      disabled={disableButton}
      sx={{ width: '90%', marginTop: '20px', marginBottom: '20px' }}
    >
      Sign In
    </Button>
  );
}

export default SigninButton;
