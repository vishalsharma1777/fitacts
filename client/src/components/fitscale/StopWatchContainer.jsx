import * as React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import StopWatch from './StopWatch';
import SaveRecord from './SaveRecord';

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



export default function StopWatchContainer({openMainModal, setOpenMainModal}) {
  const [disabled, SetDisabled] = useState(true);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setisTimerRunning] = useState(false);
  const performanceState = useSelector((state) => state.performance);
  const activity_id = performanceState.performance_activity_id;
  const distance = performanceState.performance_distance;

  useEffect(() => {
    if (activity_id != null && +distance > 0 && distance !== '') {
      SetDisabled(false);
    } else {
      SetDisabled(true);
    }
  }, [activity_id, distance]);

  // const [openMainModal, setOpenMainModal] = React.useState(false);
  const handleOpen = () => {
    setOpenMainModal(true);
  };
  const handleCloseMainModal = () => {
    setOpenMainModal(false);
    setTime(0)
  };

  return (
    <div>
      <Button variant='contained' onClick={handleOpen} disabled={disabled}>
        Start
      </Button>
      <Modal
        open={openMainModal}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...style, width: 400 }}>
          <StopWatch time={time} setTime={setTime} isTimerRunning={isTimerRunning} setisTimerRunning={setisTimerRunning}/>
          <br />
          <div className='below-stopwatch'>
            <SaveRecord time={time} isTimerRunning={isTimerRunning} handleCloseMainModal={handleCloseMainModal}/>
            <Button onClick={handleCloseMainModal}>close</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
