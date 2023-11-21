import Navbar from '../components/Common/Navbar';
import ReceivedRequests from '../components/requests/ReceivedRequests';

function Requests() {
  return (
    <>
      <Navbar />
      <div className='community-center'>
        <h1>Welcome to Requests</h1>
        <br />
        <h5>Accept or Reject the requests you got.</h5>
        <ReceivedRequests/>
      </div>
    </>
  );
}

export default Requests;
