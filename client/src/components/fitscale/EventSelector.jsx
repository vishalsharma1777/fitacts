import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { userActions } from '../../store/userSlice';
import { jwtDecode } from 'jwt-decode';
import { getFavoriteActivitiesDetails } from '../../apis/activitesApi';
import { performanceActions } from '../../store/PerformanceSlice';

function EventSelector() {
  const dispatch = useDispatch();
  const [event, setEvent] = useState('');
  const [scale, setScale] = useState('');
  const userState = useSelector((state) => state.user);
  const performanceState = useSelector((state) => state.performance);
  const activity_id = performanceState.performance_activity_id;
  const distance = performanceState.performance_distance;

  const selectedEvent = userState.userFavWithDetails.filter((activity) => {
    return activity.activity_id === event;
  });
  useEffect(() => {
    if (selectedEvent[0]) {
      dispatch(
        performanceActions.performanceActivityNameAction(
          selectedEvent[0].activityName
        )
      );
      if (selectedEvent[0].mts) {
        setScale('mts.');
        dispatch(performanceActions.performanceMtsAction(true));
        dispatch(performanceActions.performanceUnitActions('mts.'));
      } else {
        setScale('kms.');
        dispatch(performanceActions.performanceMtsAction(false));
        dispatch(performanceActions.performanceUnitActions('kms.'));
      }
    }
  }, [event]);

  var user_id = '';
  user_id = jwtDecode(localStorage.getItem('token')).id;

  useEffect(() => {
    dispatch(performanceActions.performanceDistanceAction(0));

    dispatch(userActions.userFavWithDetailsAction([]));
    getFavoriteActivitiesDetails(user_id)
      .then((res) => {
        dispatch(userActions.userFavWithDetailsAction(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(userActions.userFavWithDetailsErrorAction(err));
      });
  }, []);

  const handleChange = (event) => {
    setEvent(event.target.value);
    dispatch(
      performanceActions.performanceActivityIdAction(event.target.value)
    );
  };

  const enterDistance = (event) => {
    dispatch(performanceActions.performanceDistanceAction(event.target.value));
  };

  const activitiesDetails = userState.userFavWithDetails;
  return (
    <>
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id='demo-simple-select-label'>Activity</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={event}
          label='Activity'
          onChange={handleChange}
        >
          {activitiesDetails.map((activity) => {
            return (
              <MenuItem key={activity.activity_id} value={activity.activity_id}>
                {activity.activityName.toUpperCase()}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
        <OutlinedInput
          id='outlined-adornment-weight'
          type='number'
          onChange={enterDistance}
          endAdornment={<InputAdornment position='end'>{scale}</InputAdornment>}
          aria-describedby='outlined-weight-helper-text'
          inputProps={{
            'aria-label': 'distance'
          }}
        />
      </FormControl>
    </>
  );
}

export default EventSelector;
