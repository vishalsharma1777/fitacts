import axios from 'axios';

export const userLogin = (details) => {
    return axios.post('http://localhost:3000/user/loginUser', details);
}

export const createUser = (sigupdata)=>{
    return axios.post('http://localhost:3000/user/createUser',sigupdata)
}