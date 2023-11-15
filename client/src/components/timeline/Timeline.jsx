import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import dateConverter from '../../helperFunctions/dateConverter';
import convertMsToTime from '../../helperFunctions/timeconverter';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Timeline({ timelineItem}) {
  return (
    <>
      <Card sx={{ maxWidth: 400 ,
      margin: '40px',
      }}>
        <CardMedia
          component='img'
          alt='green iguana'
          height='140'
          image={timelineItem.image}
        />
        <CardContent>
          <div className='callories1'>
            {timelineItem.performancename.toUpperCase()}
          </div>
          <p className='detail'>
            {' '}
            <span className='detailKeys'>Activity - </span>{' '}
            {timelineItem.activityName.toUpperCase()}{' '}
          </p>
          <p className='detail'>
            {' '}
            <span className='detailKeys'>Activity - </span>{' '}
            {dateConverter(timelineItem.created_at)}{' '}
          </p>
          <p className='detail'>
            {' '}
            <span className='detailKeys'>Distance - </span>{' '}
            {timelineItem.distance}{' '}{timelineItem.mts? 'mts' : 'kms'}
          </p>
          <p className='detail'>
            {' '}
            <span className='detailKeys'>Duration - </span>{' '}
            {convertMsToTime(timelineItem.duration)}{' '}
          </p>
          <p className='detail'>
            {' '}
            <span className='detailKeys'>Speed - </span> {timelineItem.speed}{' '}
            mts/sec
          </p>
        </CardContent>
      </Card>
    </>
  );
}

export default Timeline;
