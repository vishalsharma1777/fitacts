import '../../../loader.css';
import { useEffect } from 'react';
import Favicon from 'react-favicon';

function Loading() {
  useEffect(() => {
    document.title = 'Loading...';
  }, []);
  return (
    <>
      <Favicon url='favicon.png'></Favicon>
      <div className='loaderContainer'>
        <span className='loader'></span>
      </div>
    </>
  );
}

export default Loading;
