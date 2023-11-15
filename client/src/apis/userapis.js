import axios from 'axios';

export const userLogin = (details) => {
    return axios.post('http://localhost:3000/user/loginUser', details);
}

export const createUser = (sigupdata) => {
    return axios.post('http://localhost:3000/user/createUser', sigupdata)
}

export const getFollowerTimeline = (id, page) => {
    return axios.get(`http://localhost:3000/user/getFollowerTimeline/${id}`, {
      params: { page }
    });
  };


  export const getUserTimeline = (id, page) => {
    return axios.get(`http://localhost:3000/user/getUserTimeline/${id}`);
  };


export const getTimelineArray = (id) => {
    return axios.get(`http://localhost:3000/user/userTimeline/${id}`)
}

export const getUserById = (id) => {
    return axios.get(`http://localhost:3000/user/getUserById/${id}`)
}

export const getUserAdhar = (id) => {
    return axios.get(`http://localhost:3000/user/getUserAdhar/${id}`)
}

export const uploadAadhar = (id, name) => {
    return axios.put(`http://localhost:3000/user/uploadAadhar/${id}`, {name})
}




