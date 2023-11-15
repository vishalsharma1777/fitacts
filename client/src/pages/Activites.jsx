import { useEffect } from 'react';
import Navbar from '../components/Common/Navbar';
import Favicon from 'react-favicon';
import { getActivities } from '../apis/activitesApi';
import { useSelector, useDispatch } from 'react-redux';
import { activityActions } from '../store/activitySlice';
import { jwtDecode } from 'jwt-decode';
import { userActions } from '../store/userSlice';
import Loading from '../components/Common/Loading';
import Activity from '../components/activities/Activity';
import { getUserFavActivites } from '../apis/activitesApi';
import { getUserAdhar } from '../apis/userapis';
import AdharCheck from '../components/adhar/AdharCheck';
import { useNavigate } from 'react-router-dom';
import StartingPage from './StartingPage';

function Activites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activityState = useSelector((state) => state.activites);
  const userState = useSelector((state) => state.user);
  var user_id = '';
  if(localStorage.getItem('token') == null){
    return <StartingPage/>
  }

  user_id = jwtDecode(localStorage.getItem('token')).id;

  useEffect(() => {
    getActivities()
      .then((res) => {
        dispatch(activityActions.activityLoadingAction(false));
        dispatch(activityActions.activitiesAction(res.data));
      })
      .catch((err) => {
        dispatch(activityActions.activityLoadingAction(false));
        dispatch(activityActions.activityErrorAction(err));
        dispatch(activityActions.activitiesAction([]));
      });

    getUserFavActivites(user_id)
      .then((res) => {
        dispatch(
          userActions.userFavActivitiesAction(res.data.body.favActivities)
        );
      })
      .catch((err) => {
        console.log(err);
      });

    getUserAdhar(user_id).then((res) => {
      if (res.data.aadhar == null) {
        dispatch(userActions.userAdharAction(false));
      } else {
        dispatch(userActions.userAdharAction(true));
      }
    });

    document.title = 'Fit Acts | Activites';
  }, []);

  if (activityState.activityLoading) {
    return <Loading />;
  }

  return (
    <>
      <Favicon url='https://as2.ftcdn.net/v2/jpg/03/17/39/23/1000_F_317392365_DbNbOQyBnMmn1ahAGc3cdotSXYyI7BoA.jpg'></Favicon>
      <Navbar />
      {userState.userAdhar ? (
        <>
          <div className='activity-center'>
            <h1>Mark Your Favourite Activities</h1>
          </div>
          <div className='activities-conatainer'>
            {activityState.activities.map((activity, index) => {
              return <Activity key={index} activity={activity} />;
            })}
          </div>
        </>
      ) : (
        <AdharCheck />
      )}
    </>
  );
}

export default Activites;
