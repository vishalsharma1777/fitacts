import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { performanceActions } from '../../store/PerformanceSlice';
import { useEffect } from 'react';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page = useLocation().pathname.substring(11);
  const username = localStorage.getItem('user')
  const [alignment, setAlignment] = useState(page);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    if (alignment === 'timeline') {
      dispatch(performanceActions.performanceStateReseter());
      navigate('/dashboard/timeline');
    } else if (alignment === 'activities') {
      dispatch(performanceActions.performanceStateReseter());
      navigate('/dashboard/activities');
    } else if (alignment === 'fitscale') {
      dispatch(performanceActions.performanceStateReseter());
      navigate('/dashboard/fitscale');
    } else if (alignment === 'profile') {
      navigate('/dashboard/profile');
    } else if (alignment === 'community') {
      navigate('/dashboard/community');
    }
  }, [alignment]);

  return (
    <>
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
      <ToggleButton value='timeline'>TIMELINE</ToggleButton>
      <ToggleButton value='activities'>ACTIVITIES</ToggleButton>
      <ToggleButton value='fitscale'>FIT SCALE</ToggleButton>
      <ToggleButton value='community'>COMMUNITY</ToggleButton>
      <ToggleButton value='profile'>Hi {username}</ToggleButton>
    </ToggleButtonGroup>
    <div className='below-navbar'>Welcome to FitActs {username}</div>
    </>
  );
}
