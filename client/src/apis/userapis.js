import axios from 'axios';

export const userLogin = (details) => {
    return axios.post('http://localhost:3000/user/loginUser', details);
}

export const createUser = (sigupdata)=>{
    return axios.post('http://localhost:3000/user/createUser',sigupdata)
}

export const getUserTimeline = (id)=>{
    return axios.get(`http://localhost:3000/user/getUserTimeline/${id}`)
}


export const getTimelineArray = (id)=>{
    return axios.get(`http://localhost:3000/user/userTimeline/${id}`)
}

export const getUserById = (id)=>{
    return axios.get(`http://localhost:3000/user/getUserById/${id}`)
}