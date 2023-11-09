import { useEffect } from 'react';
import Navbar from '../components/Common/Navbar';
import Favicon from 'react-favicon';

function Activites() {
    useEffect(()=>{
        document.title = 'Fit Acts | Activites'
    },[])
  return (
    <>
      <Favicon url='favicon.png'></Favicon>
      <Navbar />
      <div>
        <h1>Activites</h1>
      </div>
    </>
  );
}

export default Activites;
