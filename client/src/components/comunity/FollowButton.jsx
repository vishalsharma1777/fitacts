import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { addOrRemoveFollowing } from '../../apis/comunityApi';
import { useEffect, useState } from 'react';

function FollowButton({ user_id }) {
  const [following, setFollowing] = useState(false);
  const comunityState = useSelector((state) => state.comunity);
  const currentUser_id = jwtDecode(localStorage.getItem('token')).id;
  
  useEffect(() => {
    if (
      comunityState.comunity
        .find((user) => user.user_id === currentUser_id)
        .following.includes(user_id)
    ) {
      setFollowing(true);
    }
  }, [comunityState.comunity, currentUser_id, user_id]);

  const handleFollow = () => {
    document.getElementById(user_id).disabled = true;
    document.getElementById(user_id).innerHTML = 'Loading...';
    addOrRemoveFollowing(currentUser_id, user_id).then(() => {
      document.getElementById(user_id).disabled = false;
      document.getElementById(user_id).innerHTML = following
        ? 'Follow'
        : 'Unfollow';
      setFollowing(!following);
    });
  };

  return (
    <div>
      <Button
        id={user_id}
        variant='contained'
        color={following ? 'error' : 'success'}
        onClick={handleFollow}
      >
        {following ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  );
}

export default FollowButton;
