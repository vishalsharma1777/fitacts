import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Timeline from '../components/timeline/Timeline';
import Navbar from '../components/Common/Navbar';
import { getUserTimeline } from '../apis/userapis';
import { jwtDecode } from 'jwt-decode';
import { timelineActions } from '../store/timelineSlice';
import { useDispatch } from 'react-redux';
import StartingPage from './StartingPage';

function TimeineContainer() {
  const dispatch = useDispatch();
  const timelineState = useSelector((state) => state.timeline);
  if(localStorage.getItem('token') == null){
    return <StartingPage/>
  }
  const user_id = jwtDecode(localStorage.getItem('token')).id;
  useEffect(() => {
    getUserTimeline(user_id)
      .then((res) => {
        dispatch(timelineActions.timelineSuccessAction(res.data));
      })
      .catch((err) => {
        console.log(err);
      });

    document.title = 'Fit Acts | Timeline';
  }, []);

  return (
    <>
      <Navbar />
      <div className='activities-conatainer'>
        {timelineState.timeline.map((timelineItem, index) => {
          return <Timeline key={index} timelineItem={timelineItem} />;
        })}
      </div>
    </>
  );
}

export default TimeineContainer;
