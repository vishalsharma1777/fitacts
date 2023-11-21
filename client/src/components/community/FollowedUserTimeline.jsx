import { useEffect, useState, useRef } from 'react';
import { getFollowerTimeline } from '../../apis/userapis';
import Timeline from '../timeline/Timeline';
import Navbar from '../Common/Navbar';
import { Button } from '@mui/material';
import StartingPage from '../../pages/StartingPage';
import { useNavigate } from 'react-router-dom';
import Favicon from 'react-favicon';
function FollowedUserTimeline() {
  const [followingTimeline, setFollowingTimeline] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalDataLength, setTotalDataLength] = useState(0);
  const [page, setPage] = useState(1);
  const user_id = localStorage.getItem('ClickedId');
  const followedUser = localStorage.getItem('ClickedUser');
  const timelineContainerRef = useRef(null);
  const navigate = useNavigate();

  if (!localStorage.getItem('token')) {
    return <StartingPage />;
  }

  const loadMoreTimeline = async () => {
    try {
      setLoading(true);
      const res = await getFollowerTimeline(user_id, page);
      const newData = res.data.timeline;
      setTotalDataLength(res.data.total);
      setFollowingTimeline((prevTimeline) => [...prevTimeline, ...newData]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreTimeline();
    document.title = 'Fit Acts | Following';
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      !loading &&
      followingTimeline.length < totalDataLength
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, followingTimeline.length, totalDataLength]);

  
  const handleClick = () => {
    navigate('/dashboard/community', { state: { from: 'following' } });
    localStorage.removeItem('ClickedUser');
  };

  return (
    <>
      <Favicon url='https://as2.ftcdn.net/v2/jpg/03/17/39/23/1000_F_317392365_DbNbOQyBnMmn1ahAGc3cdotSXYyI7BoA.jpg'></Favicon>
      <Navbar />
      <Button variant='contained' color='success' onClick={handleClick}>
        Back
      </Button>
      <h1 className='community-center'>Seeing Timeline Of {followedUser}</h1>
      {followingTimeline.length === 0 && (
        <div className='no-timeline'>
          <h2>No timeline to show</h2>
        </div>
      )}

      <div className='activities-container' ref={timelineContainerRef}>
        {followingTimeline.map((timelineItem, index) => (
          <Timeline key={index} timelineItem={timelineItem} />
        ))}
        {loading && <div>Loading...</div>}
      </div>
    </>
  );
}

export default FollowedUserTimeline;
