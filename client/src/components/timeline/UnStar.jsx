import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { timelineActions } from '../../store/timelineSlice';
import { updateTimeline } from '../../apis/performanceApi';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

function Unstar({ timelineItem ,setTimeLineArray}) {
    const dispatch = useDispatch();
    const user_id = jwtDecode(localStorage.getItem('token')).id;
    const deleteTimelineHandler = () => {
        updateTimeline(user_id, timelineItem.performance_id).then((res) => {
            console.log(res.data.body.user.timelineArray);
            setTimeLineArray(res.data.body.user.timelineArray);
        }
        );
    };

  return (
    <IconButton aria-label='delete'>
      <DeleteIcon color='error' onClick={deleteTimelineHandler} />
    </IconButton>
  );
}

export default Unstar;

