import { getUsersWithAllDetails } from '../../apis/comunityApi';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Button, List } from '@mui/material';
import { ListItemText } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FollowButton from './FollowButton';
import { comunityActions } from '../../store/ComunitySlice';
import { useDispatch,useSelector } from 'react-redux';

function Peoples() {
    const dispatch = useDispatch();
    const comunityState = useSelector((state) => state.comunity);
  const user_id = jwtDecode(localStorage.getItem('token')).id;

  useEffect(() => {
    getUsersWithAllDetails()
      .then((res) => {
        dispatch(comunityActions.getComunitySuccess(res.data));
      })
      .catch((err) => {
        dispatch(comunityActions.getComunityFailure(err.message))
      });

    document.title = 'Fit Acts | Comunity';
  }, []);

  let otherUsers = comunityState.comunity.filter((user) => user.user_id !== user_id);

  return (
    <>
      <List>
        {otherUsers.map((user) => {
          return (
            <div key={user.user_id} className='peoples-list'>
              <ListItem disablePadding sx={{ width: '100%' }}>
                <ListItemIcon>
                  <AccountCircleIcon color='success' />
                </ListItemIcon>
                <ListItemText
                  primary={user.name}
                  sx={{ width: '10%' }}
                  secondary={user.email}
                />
                <ListItemText
                  sx={{ width: '60%' }}
                  primary={user.favactivities.map((activity) => {
                    return (
                      <Button>{activity.activityName.toUpperCase()}</Button>
                    );
                  })}
                />
                <FollowButton user_id={user.user_id} />
              </ListItem>
              <Divider />
            </div>
          );
        })}
      </List>
    </>
  );
}

export default Peoples;
