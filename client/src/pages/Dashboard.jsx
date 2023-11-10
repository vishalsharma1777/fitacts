import { useEffect } from 'react';
import Navbar from '../components/Common/Navbar';
import Favicon from 'react-favicon';


function Dashboard() {
  const username = localStorage.getItem('user');
  useEffect(() => {
    document.title = 'Fit Acts | Dashboard';
  }, []);
  return (
    <>
      <Favicon url='favicon.png'></Favicon>
      <Navbar />
      <div className='dashboard-heading'>
        <h2>
          Welcome{' '}
          <span className='dashboard-name'>{username.toUpperCase()}</span> to
          our Fit Acts Platform.
        </h2>
      </div>
    </>
  );
}

export default Dashboard;
