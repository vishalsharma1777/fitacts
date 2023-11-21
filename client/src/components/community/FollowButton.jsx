import { Button } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { requestAction } from '../../apis/requestsApi';

function FollowButton({ user_id , following, sendRequest, setFollowing, setSendRequest}) {
  const currentUser_id = jwtDecode(localStorage.getItem('token')).id;
  


  let buttonColor = 'success';
  let buttonText = 'Follow';
  let nextAction = 'sendrequest';

    if (following.includes(user_id)) {
      buttonColor = 'error';
      buttonText = 'Unfollow';
      nextAction = 'unfollow';
    }
  
    if (sendRequest.includes(user_id)) {
      buttonColor = 'warning';
      buttonText = 'Requested';
      nextAction = 'cancelrequest';
    }

  const handleFollow = () => {
    console.log("triggered");
    requestAction(currentUser_id, user_id, nextAction)
      .then((res) => {
        if (res.status == 200) {
          if (nextAction === 'sendrequest') {
            setSendRequest([...sendRequest, user_id]);
            buttonColor = 'warning';
            buttonText = 'Requested';
            nextAction = 'cancelrequest';

          } else if (nextAction === 'unfollow') {
            setFollowing(following.filter((id) => id !== user_id));
            buttonColor = 'success';
            buttonText = 'Follow';
            nextAction = 'sendrequest';
          } else if (nextAction === 'cancelrequest') {
            setSendRequest(sendRequest.filter((id) => id !== user_id));
            buttonColor = 'success';
            buttonText = 'Follow';
            nextAction = 'sendrequest';
          }
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Button id={user_id} variant='contained' color={buttonColor} onClick={handleFollow}>{buttonText}</Button>
    </div>
  );
}

export default FollowButton;
