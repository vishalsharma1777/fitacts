import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { deletePerformance } from '../../apis/performanceApi';
import { tableDataActions } from '../../store/TableDataSlice';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

function DeletePerformance({ performance }) {
  const dispatch = useDispatch();
  const user_id = jwtDecode(localStorage.getItem('token')).id;
  const deletePerformanceHandler = () => {
    deletePerformance(
      user_id,
      performance.activity_id,
      performance.performance_id
    ).then((res) => {
      dispatch(tableDataActions.tableDataAction(res.data));
    });
  };
  
  return (
    <IconButton onClick={deletePerformanceHandler} aria-label='delete'>
      <DeleteIcon />
    </IconButton>
  );
}

export default DeletePerformance;
