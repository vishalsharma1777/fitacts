import React from 'react';
import { getUsersSendRequests } from '../../apis/requestsApi';
import { useEffect, useState } from 'react';
import RequestedUser from '../requests/RequestedUser';
import { List } from '@mui/material';
import { jwtDecode } from 'jwt-decode';


function Pending() {
  const [requests, setRequests] = useState([]);
  const user_id = jwtDecode(localStorage.getItem('token')).id;

  useEffect(() => {
    getUsersSendRequests(user_id)
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <List>
        {requests.map((user, index) => {
          return <RequestedUser key={index} user={user} />;
        })}
      </List>
    </>
  );
}

export default Pending;
