import React from 'react';
import { getUserTop5Performances } from '../apis/performanceApi';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import convertMsToTime from '../helperFunctions/timeconverter';
import dateConverter from '../helperFunctions/dateConverter';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Common/Navbar';


function TopFivePerformance() {
  const [topFivePerformances, setTopFivePerformances] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const activityName = location.state.activityName;
  const user_id = jwtDecode(localStorage.getItem('token')).id;
  useEffect(() => {
    getUserTop5Performances(user_id, id)
      .then((res) => {
        setTopFivePerformances(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);


  return (
    <>
    <Navbar/>
      <div className='table-contaier'>
        {topFivePerformances.length === 0 && (
          <>
            <h2>No Performances of Activity {activityName.toUpperCase()}</h2>
          </>
        )}

        {topFivePerformances.length > 0 && (
          <>
            <h2>
              Showing The Top 5 Performances of{' '}
              <span className='table-header'>
                {activityName}
              </span>{' '}
              Activity
            </h2>
          </>
        )}

        {topFivePerformances.length > 0 && (
          <>
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topFivePerformances.map((row, index) => (
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </div>
    </>
  );
}

export default TopFivePerformance;
