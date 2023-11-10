import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { userActions } from '../../store/userSlice';
import { jwtDecode } from 'jwt-decode';
import { getFavoriteActivitiesDetails } from '../../apis/activitesApi';

function EventSelector() {
  const dispatch = useDispatch();
  const [event, setEvent] = useState('');
  const userState = useSelector((state) => state.user);

  var user_id = '';
  user_id = jwtDecode(localStorage.getItem('token')).id;

  useEffect(() => {
    getFavoriteActivitiesDetails(user_id)
      .then((res) => {
        console.log(res.data);
        // dispatch(
        //   userActions.userFavActivitiesAction(res.data.body.favActivities)
        // );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const handleChange = (event) => {
    setEvent(event.target.value);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id='demo-simple-select-label'>Activity</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={event}
        label='Activity'
        onChange={handleChange}
      >
        {/* {favActivitiesArray.map((activity, index) => {
          return (
            <MenuItem key={index} value={activity}>
              {activity}
            </MenuItem>
          );
        })} */}
      </Select>
    </FormControl>
  );
}

export default EventSelector;
