import { useEffect } from 'react';
import Navbar from '../components/Common/Navbar';
import Favicon from 'react-favicon';
import EventSelector from '../components/fitscale/EventSelector';
import StopWatchContainer from '../components/fitscale/StopWatchContainer';
import { useSelector } from 'react-redux';
import EnhancedTable from '../components/fitscale/Performances';

function Fitscale() {
  const performanceState = useSelector((state) => state.performance);
  useEffect(() => {
    document.title = 'Fit Acts | Fit Scale';
  }, []);
  return (
    <>
      <Favicon url='favicon.png'></Favicon>
      <Navbar />
      <div className='activity-center'>
        <h1>Record Your Performances</h1>
      </div>
      <div className='fitscale1'>
        <EventSelector />
        <StopWatchContainer />
      </div>
      <EnhancedTable/>
    </>
  );
}

export default Fitscale;
