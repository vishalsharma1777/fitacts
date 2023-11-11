import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { getUserperformance } from '../../apis/performanceApi';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import convertMsToTime from '../../helperFunctions/timeconverter';
import dateConverter from '../../helperFunctions/dateConverter';
import StarItem from './StarPerformance';
import DeletePerformance from './DeletePerformance';
import { tableDataActions } from '../../store/TableDataSlice';
import { getTimelineArray } from '../../apis/userapis';


function PerformanceTable() {
  const [timeline, setTimeline] = useState([]);
  const dispatch = useDispatch();
  const user_id = jwtDecode(localStorage.getItem('token')).id;
  const tableState = useSelector((state) => state.table);
  const performanceState = useSelector((state) => state.performance);
  useEffect(() => {
    getUserperformance(user_id, performanceState.performance_activity_id).then(
      (res) => {
        dispatch(tableDataActions.tableDataAction(res.data));
      }
    );
    getTimelineArray(user_id).then((res) => {
      setTimeline(res.data.body.timeline);
    }
    );

  }, [performanceState]);

  return (
    <div className='table-contaier'>
      {performanceState.performance_activity_name &&
        tableState.tableData.length === 0 && (
          <>
            <h2>
              {' '}
              No Performances of{' '}
              {performanceState.performance_activity_name.toUpperCase()}{' '}
              Activity
            </h2>
          </>
        )}
      {performanceState.performance_activity_name &&
        tableState.tableData.length > 0 && (
          <>
            <h2>
              Showing All The Performances of{' '}
              <span className='table-header'>
                {' '}
                {performanceState.performance_activity_name.toUpperCase()}{' '}
              </span>
              Activity
            </h2>
            <TableContainer sx={{ width: '90%' }} component={Paper}>
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Sl. No.</TableCell>
                    <TableCell>Performance Name</TableCell>
                    <TableCell align='center'>Distance Covered</TableCell>
                    <TableCell align='center'>Time Taken</TableCell>
                    <TableCell align='center'>Speed</TableCell>
                    <TableCell align='center'>Performed At</TableCell>
                    <TableCell align='center'>Move To TimeLine</TableCell>
                    <TableCell align='center'>Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableState.tableData.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell align='center'>{index + 1}</TableCell>

                      <TableCell component='th' scope='row' align='center'>
                        {row.performancename}
                      </TableCell>

                      <TableCell align='center'>
                        {row.distance} {row.mts ? 'mts.' : 'kms.'}
                      </TableCell>
                      <TableCell align='center'>
                        {convertMsToTime(row.duration)}
                      </TableCell>
                      <TableCell align='center'>{row.speed} mts/sec</TableCell>
                      <TableCell align='center'>
                        {dateConverter(row.created_at)}
                      </TableCell>
                      <TableCell align='center'>
                        <StarItem performance={row} timeline={timeline}/>
                      </TableCell>
                      <TableCell align='center'>
                        <DeletePerformance performance={row} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
    </div>
  );
}

export default PerformanceTable;
