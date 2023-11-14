import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { activityActions } from "../../store/activitySlice";
import { comunityActions } from "../../store/ComunitySlice";
import { performanceActions } from "../../store/PerformanceSlice";
import { signinActions } from "../../store/signinSlice";
import {signupActions} from "../../store/signupSlice";
import { tableDataActions } from "../../store/TableDataSlice";
import { timelineActions } from "../../store/timelineSlice";
import { userActions } from "../../store/userSlice";
import { useEffect } from 'react';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const page = useLocation().pathname.substring(11);
  const [alignment, setAlignment] = useState(page);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    if (newAlignment === 'logout') {
      dispatch(activityActions.activityReseter());
      dispatch(comunityActions.comunityStateReseter());
      dispatch(performanceActions.performanceStateReseter());
      dispatch(signinActions.siginStateReseter());
      dispatch(signupActions.sigupStateReseter());
      dispatch(tableDataActions.tableDataStateReseter());
      dispatch(timelineActions.timelineResetAction());
      dispatch(userActions.userReseter());
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    }
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
    } else if (alignment === 'comunity') {
      navigate('/dashboard/comunity');
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
      <ToggleButton value='timeline'>TIMELINE</ToggleButton>
      <ToggleButton value='activities'>ACTIVITIES</ToggleButton>
      <ToggleButton value='fitscale'>FIT SCALE</ToggleButton>
      <ToggleButton value='profile'>PROFILE</ToggleButton>
      <ToggleButton value='comunity'>COMUNITY</ToggleButton>
      <ToggleButton value='logout'>LOGOUT</ToggleButton>
    </ToggleButtonGroup>
  );
}
