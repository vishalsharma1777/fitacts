import { useEffect } from 'react';
import Navbar from '../components/Common/Navbar';
import Favicon from 'react-favicon';
import EventSelector from '../components/fitscale/EventSelector';

function Fitscale() {
  useEffect(() => {
    document.title = 'Fit Acts | Fit Scale';
  }, []);
  return (
    <>
      <Favicon url='favicon.png'></Favicon>
      <Navbar />
      <div>
        <h1>Fitscale</h1>
      </div>
      <EventSelector />
    </>
  );
}

export default Fitscale;
