import Navbar from '../components/Common/Navbar';
import Favicon from 'react-favicon';
import StartingPage from './StartingPage';

function Dashboard() {
  const username = localStorage.getItem('user');
  if(localStorage.getItem('token') == null){
    return <StartingPage/>
  }
  return (
    <>
      <Favicon url='https://as2.ftcdn.net/v2/jpg/03/17/39/23/1000_F_317392365_DbNbOQyBnMmn1ahAGc3cdotSXYyI7BoA.jpg'></Favicon>
      <Navbar />
      <div className='dashboard-heading'>
        <h2>
          Welcome{' '}
          <span className='dashboard-name'>{username.toUpperCase()}</span> to
          our Fit Acts Platform.
        </h2>
      </div>
      <br/>
      <br/>
    </>
  );
}

export default Dashboard;
