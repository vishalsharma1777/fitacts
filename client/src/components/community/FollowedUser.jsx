import React from 'react';
import { ListItemText } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

function FollowedUser({ user }) {
  const navigate = useNavigate();
  const openTimeline = () => {
    const clickedUserName = user.name;
    const clickeduserId= user.user_id;
    localStorage.setItem('ClickedUser', clickedUserName);
    localStorage.setItem('ClickedId', clickeduserId);
    navigate(`/dashboard/following/timeline`);
  }




  return (
    <>
      <div key={user.user_id} className='peoples-list'>
        <ListItem disablePadding sx={{ width: '100%' }} onClick={openTimeline}>
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
    </>
  );
}

export default FollowedUser;
