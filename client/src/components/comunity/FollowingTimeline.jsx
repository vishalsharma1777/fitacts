import React from 'react';
import { useEffect, useState } from 'react';
import { getUserTimeline } from '../../apis/userapis';
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


  return (
    <>
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

export default FollowingTimeline;
