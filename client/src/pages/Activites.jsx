import { useEffect } from 'react';
import Navbar from '../components/Common/Navbar';
import Favicon from 'react-favicon';
import { getActivities } from '../apis/activitesApi';
import { useSelector, useDispatch } from 'react-redux';
import { activityActions } from '../store/activitySlice';
import Loading from '../components/Common/Loading';
import Activity from '../components/activities/Activity';

function Activites() {
  const dispatch = useDispatch();
  const activityState = useSelector((state) => state.activites);
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
    document.title = 'Fit Acts | Activites';
  }, []);

  if (activityState.activityLoading) {
    return <Loading />;
  }

  
  return (
    <>
      <Favicon url='favicon.png'></Favicon>
      <Navbar />
      <div className='activity-center'>
        <h1>Mark Your Favourite Activities</h1>
      </div>
      <div className='activities-conatainer'>
        {activityState.activities.map((activity) => {
          return <Activity activity={activity} />;
        })}
      </div>
    </>
  );
}

export default Activites;
