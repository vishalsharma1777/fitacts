import { ListItemText } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import {acceptRequest} from '../../apis/requestsApi';
import { rejectRequest } from '../../apis/requestsApi';
import { jwtDecode } from 'jwt-decode';

function ReceivedUser({ user,reload,setReload }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user_id = jwtDecode(localStorage.getItem('token')).id;

  const handleAccept = () => {
    acceptRequest(user_id, user.user_id)
      .then((res) => {
        setOpen(false)
        setReload(!reload);
      })
      .catch((err) => {
        setOpen(false)
        setReload(!reload);
        console.log(err);
      });
  }

  const handleReject = () => {
    rejectRequest(user_id, user.user_id)
      .then((res) => {
        setOpen(false)
        setReload(!reload);
      })
      .catch((err) => {
        setOpen(false)
        setReload(!reload);
        console.log(err);
      });
  }

  return (
    <>
      <div>
        <Button onClick={handleOpen}>
          <div key={user.user_id} className='peoples-list'>
            <ListItem disablePadding sx={{ width: '100%' }}>
              <ListItemIcon>
                <AccountCircleIcon color='success' />
              </ListItemIcon>
              <ListItemText
                primary={user.name}
                sx={{ width: '10%' }}
                secondary={user.email}
              />
            </ListItem>
            <Divider />
          </div>
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
         <div className='details-center'>
        <Card sx={{ maxWidth: 400 }}>
          <CardContent>
            <div className='callories1'>{user.name}</div>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Email - </span> {user.email}{' '}
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Number- </span> {user.mobilenumber}{' '}
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Height - </span> {user.height} cms.
            </p>
            <p className='detail'>
              {' '}
              <span className='detailKeys'>Weight - </span> {user.weight} kgs.
            </p>
            <p className='detail'>
              {' '}
              <Button
                variant='contained'
                color='success'
                sx={{
                  width: '100%',
                  height: '100%'
                }}
                onClick={handleAccept}
              >
                ACCEPT
              </Button>
            </p>
            <p className='detail'>
              {' '}
              <Button
                variant='contained'
                color='error'
                sx={{
                  width: '100%',
                  height: '100%'
                }}
                onClick={handleReject}
              >
                REJECT
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>
        </Modal>
      </div>
    </>
  );
}

export default ReceivedUser;
