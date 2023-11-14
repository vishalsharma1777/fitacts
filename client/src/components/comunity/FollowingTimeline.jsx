import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserTimeline } from '../../apis/userapis';
import { jwtDecode } from 'jwt-decode';
import { timelineActions } from '../../store/timelineSlice';
import { useDispatch } from 'react-redux';
import Timeline from '../timeline/Timeline';

function FollowingTimeline({ user_id }) {
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

  console.log(followingTimeline);

  return (
    <>
      <div className='activities-conatainer'>
        {followingTimeline.map((timelineItem, index) => {
          return <Timeline key={index} timelineItem={timelineItem} />;
        })}
      </div>
    </>
  );
}

export default FollowingTimeline;
