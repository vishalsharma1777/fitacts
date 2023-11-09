import { useEffect } from 'react';
import Navbar from '../components/Common/Navbar';
import Favicon from 'react-favicon';

function Profile() {
  useEffect(() => {
    document.title = 'Fit Acts | Profile';
  }, []);
  return (
    <>
      <Favicon url='favicon.png'></Favicon>
      <Navbar />
      <div>
        <h1>Profile</h1>
      </div>
    </>
  );
}

export default Profile;
