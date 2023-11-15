import '../../../loader.css';
import { useEffect } from 'react';
import Favicon from 'react-favicon';
import Navbar from './Navbar';

function Loading() {
  useEffect(() => {
    document.title = 'Loading...';
  }, []);
  return (
    <>
      <Favicon url='https://as2.ftcdn.net/v2/jpg/03/17/39/23/1000_F_317392365_DbNbOQyBnMmn1ahAGc3cdotSXYyI7BoA.jpg'></Favicon>
      <div className='loaderContainer'>
        <span className='loader'></span>
      </div>
    </>
  );
}

export default Loading;
