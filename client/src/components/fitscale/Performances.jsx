import * as React from 'react';
import { getUserperformance } from '../../apis/performanceApi';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tableDataActions } from '../../store/TableDataSlice';
import { getTimelineArray } from '../../apis/userapis';
import { Checkbox } from '@mui/material';
import EnhancedTable from './Table';

function PerformanceTable() {
  const [timeline, setTimeline] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const dispatch = useDispatch();
  const user_id = jwtDecode(localStorage.getItem('token')).id;
  const tableState = useSelector((state) => state.table);
  const performanceState = useSelector((state) => state.performance);
  useEffect(() => {
    if (showAll) {
      getUserperformance(user_id).then((res) => {
        dispatch(tableDataActions.tableDataAction(res.data));
      });
    } else {
      getUserperformance(
        user_id,
        performanceState.performance_activity_id
      ).then((res) => {
        dispatch(tableDataActions.tableDataAction(res.data));
      });
    }
    getTimelineArray(user_id).then((res) => {
      setTimeline(res.data.body.timeline);
    });
  }, [performanceState.performance_activity_id, showAll]);

  const handleChange = (event) => {
    setShowAll(event.target.checked);
  };


  return (
    <>
      <Checkbox defaultChecked label='Show All' onChange={handleChange} /> Show
      All
      <div className='table-contaier'>
        {tableState.tableData!==null && (
          <EnhancedTable timeline={timeline} />
          )}
      </div>
    </>
  );
}

export default PerformanceTable;
