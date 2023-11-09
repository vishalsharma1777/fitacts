import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Activity({ activity }) {
  const name = activity.activityName;
  const caloriesBurnt = activity.calories;
  const image = activity.image;

  const handeleChange = (e) => {
    console.log(activity.activity_id, e.target.checked);
  }

  

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
            {activity.benifitFor.map((benifit) => {
              return <Button variant='contained'>{benifit}</Button>;
            })}
          </div>
        </CardContent>
        <CardActions>
            <div className='favMarker'> <h3>Mark as fav to see in events -- </h3>
          <Checkbox 
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
