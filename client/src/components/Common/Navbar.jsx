import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signinActions } from '../../store/signinSlice';
import { signupActions } from '../../store/signupSlice';
import { activityActions } from '../../store/activitySlice';
import { userActions } from '../../store/userSlice';
import { useEffect } from 'react';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page = useLocation().pathname.substring(1);
  const [alignment, setAlignment] = useState(page);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    if (newAlignment === 'logout') {
      dispatch(signinActions.siginStateReseter());
      dispatch(signupActions.sigupStateReseter());
      dispatch(activityActions.activityReseter());
      dispatch(userActions.userReseter());
      navigate('/');
    }
  };

  useEffect(() => {
    if (alignment === 'dashboard') {
      navigate('/dashboard');
    } else if (alignment === 'activities') {
      navigate('/activities');
    } else if (alignment === 'fitscale') {
      navigate('/fitscale');
    } else if (alignment === 'profile') {
      navigate('/profile');
    }
  }, [alignment]);

  return (
    <ToggleButtonGroup
      color='primary'
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label='Platform'
      fullWidth
      sx={{
        height: '5rem'
      }}
    >
      <ToggleButton value='dashboard'>DASHBOARD</ToggleButton>
      <ToggleButton value='activities'>ACTIVITIES</ToggleButton>
      <ToggleButton value='fitscale'>FIT SCALE</ToggleButton>
      <ToggleButton value='profile'>PROFILE</ToggleButton>
      <ToggleButton value='logout'>LOGOUT</ToggleButton>
    </ToggleButtonGroup>
  );
}
