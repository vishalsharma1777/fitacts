import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { getUsersFollowing } from '../../apis/comunityApi';
import { comunityActions } from '../../store/ComunitySlice';
import { Button, List } from '@mui/material';
import { ListItemText } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import FollowingTimeline from './FollowingTimeline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import FollowedUser from './FollowedUser';



function Following() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const comunityState = useSelector((state) => state.comunity);
  const user_id = jwtDecode(localStorage.getItem('token')).id;

  useEffect(() => {
    getUsersFollowing(user_id)
      .then((res) => {
        dispatch(comunityActions.getFollowingPeopleSuccess(res.data));
      })
      .catch((err) => {
        dispatch(comunityActions.getComunityFailure(err.message));
      });

    document.title = 'Fit Acts | Comunity';
  }, []);


  const followingPeople = comunityState.followingPeople;

  return (
    <>
      <List>
        {followingPeople.map((user) => {
          return (
            <FollowedUser user={user} />
          );
        })}
      </List>
    </>
  );
}

export default Following;
