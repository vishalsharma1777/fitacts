import { useEffect } from 'react';
import Navbar from '../components/Common/Navbar';
import Favicon from 'react-favicon';
import EventSelector from '../components/fitscale/EventSelector';
import StopWatchContainer from '../components/fitscale/StopWatchContainer';
import { useSelector } from 'react-redux';
import EnhancedTable from '../components/fitscale/Performances';
import { useState } from 'react';
import StartingPage from './StartingPage';

function Fitscale() {
  const [openMainModal, setOpenMainModal] = useState(false);
  if(localStorage.getItem('token') == null){
    return <StartingPage/>
  }
  useEffect(() => {
    document.title = 'Fit Acts | Fit Scale';
  }, []);
  return (
    <>
      <Favicon url='https://as2.ftcdn.net/v2/jpg/03/17/39/23/1000_F_317392365_DbNbOQyBnMmn1ahAGc3cdotSXYyI7BoA.jpg'></Favicon>
      <Navbar />
      <div className='activity-center'>
        <h1>Record Your Performances</h1>
      </div>
      <div className='fitscale1'>
        <EventSelector />
        <StopWatchContainer openMainModal={openMainModal} setOpenMainModal={setOpenMainModal}/>
      </div>
      <EnhancedTable openMainModal={openMainModal}/>
    </>
  );
}

export default Fitscale;
