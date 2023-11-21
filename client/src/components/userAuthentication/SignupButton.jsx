import { Button } from '@mui/material';
import { createUser } from '../../apis/userapis';
import { useDispatch } from 'react-redux';
import { signupActions } from '../../store/signupSlice';
import { useNavigate } from 'react-router-dom';


function SignupButton({ formdata, disabled,setAlignment }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sigupdata = {
    name:formdata.name,
    email:formdata.email,
    mobileNumber: +(formdata.mobile),
    height:+(formdata.height),
    weight:+(formdata.weight),
    password:formdata.password,
    favactivities:formdata.favactivities,
    timeline:formdata.timeline,
    following:formdata.following,
    sendrequests:formdata.sendrequests,
    receivedrequests:formdata.receivedrequests,
  }
  const submitSignUpData = async (event) => {
    event.preventDefault();
    createUser(sigupdata).then((res)=>{
      dispatch(signupActions.sigupStateReseter())
      dispatch(signupActions.signupLoadingAction(false))
      dispatch(signupActions.signupMessageAction(res.data.message))
      dispatch(signupActions.signupStatusAction(res.status))
      dispatch(signupActions.signedupUserAction(res.data.body.user))
      dispatch(signupActions.sigupSuccessAction(true))
      if(res.status==200){
        setAlignment('signin')
      }
    }).catch((err)=>{
      dispatch(signupActions.sigupStateReseter())
      dispatch(signupActions.signupLoadingAction(false))
      dispatch(signupActions.signupErrorAction(err))
    })
  };

  return (
    <Button
      variant='contained'
      type='submit'
      onClick={submitSignUpData}
      disabled={disabled}
      sx={{
        width: '90%'
      }}
    >
      Sign Up
    </Button>
  );
}

export default SignupButton;
