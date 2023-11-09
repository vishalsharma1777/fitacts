import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Favicon from 'react-favicon';
import SignInPage from './SigninPage';
import SignUpPage from './SignUpPage';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Common/Loading';

export default function StartingPage() {
  const navigate = useNavigate();
  const [alignment, setAlignment] = React.useState('signin');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    // navigate(`/${newAlignment}`);
  };

  
  return (
    <>
      <Favicon url='favicon.png'></Favicon>
      <div className='loginPage'>
        <div className='loginCard'>
          <div className='logo-with-toggle'>
            <img
              className='loginLogo'
              src='https://previews.123rf.com/images/dejanj01/dejanj011705/dejanj01170500004/78166464-triathlon-competition-with-icons-running-swimming-and-cycling.jpg'
            />

            <ToggleButtonGroup
              color='primary'
              value={alignment}
              exclusive
              onChange={handleChange}
              aria-label='Platform'
              sx={{
                marginTop: '1rem'
              }}
            >
              <ToggleButton value='signin'>Sign In</ToggleButton>
              <ToggleButton value='signup'>Sign Up</ToggleButton>
            </ToggleButtonGroup>
            <div className='form-divider'>
              {alignment == 'signin' && <SignInPage />}
              {alignment == 'signup' && <SignUpPage />}
            </div>
          </div>
          <div className='disclaimer'>
            <p>
              By logging in you are accepting our
              <br />
              <a href='https://www.termsfeed.com/blog/sample-terms-and-conditions-template/'>
                {' '}
                Terms Of Service
              </a>{' '}
              &{' '}
              <a href='https://policies.google.com/privacy?hl=en-US'>
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
