import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import StopWatch from './StopWatch';
import { TextField } from '@mui/material';
import { performanceActions } from '../../store/PerformanceSlice';
import convertMsToTime from '../../helperFunctions/timeconverter';
import { jwtDecode } from 'jwt-decode';
import SaveButton from './SaveButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3
};

export default function SaveRecord({ time, isTimerRunning,handleCloseMainModal }) {
  const dispatch = useDispatch();
  const performanceState = useSelector((state) => state.performance);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    dispatch(performanceActions.performanceDurationAction(time));
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(performanceActions.performanceDurationAction(0));
  };

  let speed = 0;
  let distance = performanceState.performance_distance;

  if (performanceState.performance_mts) {
    speed = distance / (time / 1000);
  }
  if (!performanceState.performance_mts) {
    speed = distance / time;
  }

  const user_id = jwtDecode(localStorage.getItem('token')).id;

  const performanceDetails = {
    user_id: user_id,
    performanceName: performanceState.performance_name,
    duration: performanceState.performance_duration,
    distance: +performanceState.performance_distance,
    speed: +speed.toFixed(2),
    mts: performanceState.performance_mts,
    activity_id: performanceState.performance_activity_id
  };

  const handlePrformancename = (e) => {
    dispatch(performanceActions.performanceNameAction(e.target.value));
  };

  return (
    <React.Fragment>
      <Button onClick={handleOpen} disabled={!time > 0 || isTimerRunning}>
        Save The Performance
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='child-modal-title'
        aria-describedby='child-modal-description'
      >
        <Box sx={{ ...style, width: 300 }}>
          <h2 id='child-modal-title'>Save the record?</h2>
          <br />
          <TextField
            autoFocus
            margin='dense'
            id='title'
            label='Save Performance As'
            type='text'
            fullWidth
            variant='standard'
            required
            onChange={handlePrformancename}
          />
          <p className='detail'>
            {' '}
            <span className='detailKeys'>Activity - </span>{' '}
            {performanceState.performance_activity_name.toUpperCase()}{' '}
          </p>
          <p className='detail'>
            {' '}
            <span className='detailKeys'>Distance - </span>{' '}
            {performanceState.performance_distance}{' '}
            {performanceState.performance_unit}
          </p>
          <p className='detail'>
            {' '}
            <span className='detailKeys'>Duration - </span>{' '}
            {convertMsToTime(performanceState.performance_duration)}{' '}
          </p>
          <p className='detail'>
            {' '}
            <span className='detailKeys'>Speed - </span> {speed.toFixed(3)}{' '}
            mts/sec
          </p>
          <br />
          <SaveButton performanceDetails={performanceDetails} handleCloseMainModal={handleCloseMainModal} handleClose={handleClose}/>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
