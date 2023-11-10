import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { updateFavActivity } from '../../apis/activitesApi';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Activity({ activity }) {
  const [checked, setChecked] = React.useState(false);
  const name = activity.activityName;
  const caloriesBurnt = activity.calories;
  const image = activity.image;
  const userState = useSelector((state) => state.user);
  let user_id = jwtDecode(localStorage.getItem('token')).id;


  useEffect(() => { 
    if(userState.userFavActivities.includes(activity.activity_id)){
      setChecked(true);
    }
  } , [userState.userFavActivities])

  const handeleChange = (e) => {
    setChecked(e.target.checked);
    const updatingDetails = {
      user_id: user_id,
      favActivity: activity.activity_id
    };
    updateFavActivity(updatingDetails)
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  };

  

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component='img'
          alt='green iguana'
          height='140'
          image={image}
        />
        <CardContent>
          <div className='callories1'>{name.toUpperCase()}</div>
          <div className='callories'>
            Calories burnt per hour -{' '}
            <span className='callories-number'>{caloriesBurnt}</span>
          </div>

          <br />
          <div className='benifit-Buttons'>
            {activity.benifitFor.map((benifit, index) => {
              return (
                <Button key={index} variant='contained'>
                  {benifit}
                </Button>
              );
            })}
          </div>
        </CardContent>
        <CardActions>
          <div className='favMarker'>
            {' '}
            <h3>Mark as fav to see in events -- </h3>
            <Checkbox
              checked={checked}
              onChange={handeleChange}
              id={activity.id}
              {...label}
              sx={{ '& .MuiSvgIcon-root': { fontSize: 40 } }}
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
            />
          </div>
        </CardActions>
      </Card>
    </>
  );
}

export default Activity;
