import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserTimeline } from '../../apis/userapis';
import Timeline from '../timeline/Timeline';
import Navbar from '../Common/Navbar';
import { Button } from '@mui/material';

function FollowedUserTimeline() {
  const navigate = useNavigate();
  const user_id = useParams().id;
  const followedUser = localStorage.getItem('ClickedUser');
  const [followingTimeline, setFollowingTimeline] = useState([]);
  useEffect(() => {
    getUserTimeline(user_id)
      .then((res) => {
        setFollowingTimeline(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    document.title = 'Fit Acts | Following';
  }, []);

  const handleClick = () => {
    navigate('/dashboard/community',{state: { from: 'following' }});
    localStorage.removeItem('ClickedUser');
  };

  return (
    <>
      <Navbar />
      <Button variant='contained' color='success' onClick={handleClick}>
        Back
      </Button>
      <h1>Seeing timeline of {followedUser}</h1>
      {followingTimeline.length === 0 && (
        <div className='no-timeline'>
          <h2>No timeline to show</h2>
        </div>
      )}

      <div className='activities-conatainer'>
        {followingTimeline.map((timelineItem, index) => {
          return <Timeline key={index} timelineItem={timelineItem} />;
        })}
      </div>
    </>
  );
}

export default FollowedUserTimeline;
