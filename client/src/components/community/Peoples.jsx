import { getUsersWithAllDetails } from '../../apis/communityApi';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Button, List } from '@mui/material';
import { ListItemText } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FollowButton from './FollowButton';
import { communityActions } from '../../store/communitySlice';
import { useDispatch, useSelector } from 'react-redux';
import { getStatus } from '../../apis/requestsApi';

function Peoples({ alignment }) {
  const dispatch = useDispatch();
  const communityState = useSelector((state) => state.community);
  const user_id = jwtDecode(localStorage.getItem('token')).id;
  const [following, setFollowing] = useState([]);
  const [sendRequest, setSendRequest] = useState([]);

  useEffect(() => {
    dispatch(communityActions.communityStateReseter());
    getUsersWithAllDetails()
      .then((res) => {
        dispatch(communityActions.getcommunitySuccess(res.data));
      })
      .catch((err) => {
        dispatch(communityActions.getcommunityFailure(err.message));
      });

    getStatus(user_id)
      .then((res) => {
        setFollowing(res.data.following);
        setSendRequest(res.data.requested);
      })
      .catch((err) => console.log(err));

    document.title = 'Fit Acts | community';
  }, [alignment]);

  let otherUsers = communityState.community.filter(
    (user) => user.user_id !== user_id
  );

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
                  primary={user.favactivities.map((activity, index) => {
                    return (
                      <Button key={index}>
                        {activity.activityName.toUpperCase()}
                      </Button>
                    );
                  })}
                />
                <FollowButton
                  user_id={user.user_id}
                  alignment={alignment}
                  following={following}
                  setFollowing={setFollowing}
                  sendRequest={sendRequest}
                  setSendRequest={setSendRequest}
                />
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
