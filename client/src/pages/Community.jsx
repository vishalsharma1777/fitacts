import * as React from 'react';
import { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Favicon from 'react-favicon';
import Navbar from '../components/Common/Navbar';
import Peoples from '../components/community/Peoples';
import Following from '../components/community/Following';
import { useLocation } from 'react-router-dom';

function community() {
  const [alignment, setAlignment] = React.useState('peoples');
  const location = useLocation();
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  useEffect(() => {
    if(location.state!==null){
      setAlignment(location.state.from);
    }
  }, [location.state]);


  return (
    <>
      <Navbar />
      <div>
        <h1>community</h1>
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
      <div className='community-divider'>
        {alignment == 'peoples' && <Peoples alignment={alignment} />}
        {alignment == 'following' && <Following />}
      </div>
    </>
  );
}

export default community;
