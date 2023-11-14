import { useEffect, useState } from 'react';
import Navbar from '../components/Common/Navbar';
import Favicon from 'react-favicon';
import { jwtDecode } from 'jwt-decode';
import { getUserById } from '../apis/userapis';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button } from '@mui/material';

function Profile() {
  const [user, setUser] = useState({});
  const user_id = jwtDecode(localStorage.getItem('token')).id;
  useEffect(() => {
    getUserById(user_id)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log(err);
      });
    document.title = 'Fit Acts | Profile';
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Favicon url='favicon.png'></Favicon>
      <Navbar />
      <div className="details-center">
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <div className='callories1'>
            {user.name}
          </div>
          <p className='detail'>
            {' '}
            <span className='detailKeys'>Email - </span>{' '}
            {user.email}{' '}
          </p>
          <p className='detail'>
            {' '}
            <span className='detailKeys'>Number- </span>{' '}
            {user.mobilenumber}{' '}
          </p>
          <p className='detail'>
            {' '}
            <span className='detailKeys'>Height - </span>{' '}
            {user.height}{' '} cms.
          </p>
          <p className='detail'>
            {' '}
            <span className='detailKeys'>Weight - </span>{' '}
            {user.weight}{' '} kgs.
          </p>
          <p className='detail'>
            {' '}
            <span className='detailKeys'>Adhar Card - </span>
            <Button variant="contained" href={user.adharcard} target="_blank">
              View
            </Button>
          </p>
        </CardContent>
      </Card>
      </div>
    </>
  );EnhEnhancedTable
}

export default Profile;
