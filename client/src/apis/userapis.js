import axios from 'axios';

export const userLogin = (details) => {
    return axios.post('http://localhost:3000/user/loginUser', details);
}

