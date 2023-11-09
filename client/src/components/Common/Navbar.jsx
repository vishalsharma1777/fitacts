import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signinActions } from '../../store/signinSlice';



export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page = useLocation().pathname.substring(1);
  const [alignment, setAlignment] = useState(page);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    if (newAlignment === 'logout') {
      dispatch(signinActions.siginStateReseter());
      navigate('/');
    } else {
      navigate(`/${newAlignment}`, { state: { page: newAlignment } });
    }
  };

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
