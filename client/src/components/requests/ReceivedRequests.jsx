import React from 'react';
import { getUsersReceivedRequests } from '../../apis/requestsApi';
import { useEffect, useState } from 'react';
import ReceivedUser from '../requests/ReceivedUser';
import { List } from '@mui/material';
import { jwtDecode } from 'jwt-decode';


function ReceivedRequests() {
  const [requests, setRequests] = useState([]);
  const [reload, setReload] = useState(false);
  const user_id = jwtDecode(localStorage.getItem('token')).id;

  useEffect(() => {
    getUsersReceivedRequests(user_id)
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);

  return (
    <>
      <List>
        {requests.map((user, index) => {
          return <ReceivedUser key={index} user={user} setReload={setReload}/>;
        })}
      </List>
    </>
  );
}

export default ReceivedRequests;
