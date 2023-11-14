import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

function FollowButton({ user_id }) {
  const comunityState = useSelector((state) => state.comunity);
  const currentUser_id = jwtDecode(localStorage.getItem('token')).id;
  let alreadyFollowing = comunityState.comunity
    .find((user) => user.user_id === currentUser_id)
    .following.includes(user_id);

  return (
    <div>
      <Button
        variant='contained'
        color={alreadyFollowing ? 'error' : 'success'}
      >
        {alreadyFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </div>
  );
}

export default FollowButton;
