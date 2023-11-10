import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import StarRateIcon from '@mui/icons-material/StarRate';
import DeleteIcon from '@mui/icons-material/Delete';
import { getUserperformance } from '../../apis/performanceApi';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function PerformanceTable() {
  const user_id = jwtDecode(localStorage.getItem('token')).id;
  const [performance,setperformance]=useState([])
  const performanceState = useSelector((state) => state.performance);

  useEffect(() => {
    getUserperformance(user_id,performanceState.performance_activity_id).then((res) => {
      setperformance(res.data)
    });
  }, [performanceState.performance_activity_id]);
  return (
    <div className='table-contaier'>
      {performanceState.performance_activity_name&&
      <h2>Showing All The Performances of <span className='table-header'> {performanceState.performance_activity_name.toUpperCase()} </span>Activity</h2>}
    <TableContainer sx={{ width:'90%' }} component={Paper}>
      <Table  aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Performance Name</TableCell>
            <TableCell align='right'>distance</TableCell>
            <TableCell align='right'>duration</TableCell>
            <TableCell align='right'>speed</TableCell>
            <TableCell align='right'>created_at</TableCell>
            <TableCell align='right'>Move To TimeLine</TableCell>
            <TableCell align='right'>Delete</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {performance.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.performancename}
              </TableCell>
              <TableCell align='right'>{row.distance}</TableCell>
              <TableCell align='right'>{row.duration}</TableCell>
              <TableCell align='right'>{row.speed}</TableCell>
              <TableCell align='right'>{row.created_at}</TableCell>
              <TableCell align='right'><StarRateIcon/></TableCell>
              <TableCell align='right'><DeleteIcon/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

export default PerformanceTable;
