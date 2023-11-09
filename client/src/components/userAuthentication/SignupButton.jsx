import { Button } from '@mui/material';
import { useEffect } from 'react';

function SignupButton({ formdata, disabled }) {
  const submitSignUpData = async (event) => {
    event.preventDefault();
    console.log('Submitting form data');
    console.log(formdata);
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
