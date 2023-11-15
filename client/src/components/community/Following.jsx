import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { getUsersFollowing } from '../../apis/communityApi';
import { communityActions } from '../../store/communitySlice';
import { List } from '@mui/material';
import FollowedUser from './FollowedUser';

function Following() {
  const dispatch = useDispatch();
  const communityState = useSelector((state) => state.community);
  const user_id = jwtDecode(localStorage.getItem('token')).id;

  useEffect(() => {
    getUsersFollowing(user_id)
      .then((res) => {
        dispatch(communityActions.getFollowingPeopleSuccess(res.data));
      })
      .catch((err) => {
        dispatch(communityActions.getcommunityFailure(err.message));
      });

    document.title = 'Fit Acts | community';
  }, []);

  const followingPeople = communityState.followingPeople;

  return (
    <>
      <List>
        {followingPeople.map((user,index) => {
          return <FollowedUser key={index} user={user} />;
        })}
      </List>
    </>
  );
}

export default Following;
