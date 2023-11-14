import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarIcon from '@mui/icons-material/Star';
import { updateTimeline } from '../../apis/performanceApi';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { getTimelineArray } from '../../apis/userapis';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


function StarItem({ performance,timeline }) {
const user_id = jwtDecode(localStorage.getItem('token')).id;
  const [checked, setChecked] = useState(timeline.includes(performance.performance_id));
  const handeleChange = (e) => {
    if (e.target.checked) {
      setChecked(true);
    }
    else {
      setChecked(false);
    }
    updateTimeline(user_id,performance.performance_id)
  };
  useEffect(() => {
    setChecked(timeline.includes(performance.performance_id));
  }, [timeline]);

  return (
    <Checkbox
      checked={checked}
      onChange={handeleChange}
      {...label}
      sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
      icon={<StarBorderOutlinedIcon />}
      checkedIcon={<StarIcon />}
    />
  );
}

export default StarItem;
