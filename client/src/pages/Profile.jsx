import { useEffect, useState, forwardRef } from 'react';
import Navbar from '../components/Common/Navbar';
import Favicon from 'react-favicon';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { jwtDecode } from 'jwt-decode';
import { getUserById } from '../apis/userapis';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button } from '@mui/material';
import StartingPage from './StartingPage';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { activityActions } from '../store/activitySlice';
import { communityActions } from '../store/communitySlice';
import { performanceActions } from '../store/PerformanceSlice';
import { signinActions } from '../store/signinSlice';
import { signupActions } from '../store/signupSlice';
import { tableDataActions } from '../store/TableDataSlice';
import { timelineActions } from '../store/timelineSlice';
import { userActions } from '../store/userSlice';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [severity, setSeverity] = useState('success');

  if (localStorage.getItem('token') == null) {
    return <StartingPage />;
  }
  const user_id = jwtDecode(localStorage.getItem('token')).id;
  useEffect(() => {
    getUserById(user_id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        setError(true);
        setOpenSnackBar(true);
        console.log(err);
        {err.message && setErrorMessage(err.message)}
        setErrorMessage(err.response.data.message)
        setSeverity('error')
      });
    document.title = 'Fit Acts | Profile';
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleLogout = () => {
    dispatch(activityActions.activityReseter());
    dispatch(communityActions.communityStateReseter());
    dispatch(performanceActions.performanceStateReseter());
    dispatch(signinActions.siginStateReseter());
    dispatch(signupActions.sigupStateReseter());
    dispatch(tableDataActions.tableDataStateReseter());
    dispatch(timelineActions.timelineResetAction());
    dispatch(userActions.userReseter());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('ClickedUser');
    localStorage.removeItem('ClickedId');
    navigate('/');
  };

  const handleClickSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackBar(false);
  };


  return (
    <>
      <Favicon url='https://as2.ftcdn.net/v2/jpg/03/17/39/23/1000_F_317392365_DbNbOQyBnMmn1ahAGc3cdotSXYyI7BoA.jpg'></Favicon>
      <Navbar />
      {error && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={openSnackBar}
          autoHideDuration={3000}
          onClose={handleCloseSnackBar}
        >
          <Alert
            onClose={handleCloseSnackBar}
            severity={severity}
            sx={{ width: '100%' }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      )}
      <div className='details-center'>
        <Card sx={{ maxWidth: 400 }}>
          <CardContent>
            <div className='callories1'>{user.name}</div>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Email - </span> {user.email}{' '}
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Number- </span> {user.mobilenumber}{' '}
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Height - </span> {user.height} cms.
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Weight - </span> {user.weight} kgs.
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Adhar Card - </span>
              <Button variant='contained' href={user.adharcard} target='_blank'>
                View
              </Button>
            </p>
            <p className='detail'>
              {' '}
              <Button
                variant='contained'
                color='error'
                sx={{
                  width: '100%',
                  height: '100%'
                }}
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>
      <div className='logout-button'></div>
    </>
  );
  EnhEnhancedTable;
}

export default Profile;
