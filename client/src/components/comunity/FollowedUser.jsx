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



function FollowedUser({ user }) {
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div key={user.user_id} className='peoples-list'>
        <ListItem disablePadding sx={{ width: '100%' }} onClick={handleOpen}>
          <ListItemIcon>
            <AccountCircleIcon color='success' />
          </ListItemIcon>
          <ListItemText
            primary={user.name}
            sx={{ width: '10%' }}
            secondary={user.email}
          />
        </ListItem>
        <Divider />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <FollowingTimeline user_id={user.user_id} />
      </Modal>
    </>
  );
}

export default FollowedUser;
