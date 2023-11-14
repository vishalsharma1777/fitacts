import * as React from 'react';
import { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Favicon from 'react-favicon';
import Navbar from '../components/Common/Navbar';
import Peoples from '../components/comunity/Peoples';
import Following from '../components/comunity/Following';

function Comunity() {
  const [alignment, setAlignment] = React.useState('peoples');
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    // navigate(`/${newAlignment}`);
  };
  return (
    <>
      <Navbar />
      <div>
        <h1>Comunity</h1>
      </div>
      <ToggleButtonGroup
        color='primary'
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label='Platform'
        sx={{
          marginTop: '1rem'
        }}
      >
        <ToggleButton value='peoples'>Peoples</ToggleButton>
        <ToggleButton value='following'>Following</ToggleButton>
      </ToggleButtonGroup>
      <div className='comunity-divider'>
        {alignment == 'peoples' && <Peoples />}
        {alignment == 'following' && <Following />}
      </div>
    </>
  );
}

export default Comunity;
