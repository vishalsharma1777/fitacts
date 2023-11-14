import axios from 'axios';

export const getUsersWithAllDetails = () => {
    return axios.get('http://localhost:3000/comunity/usersWithAllDetails')
}

export const getUsersFollowing = (id) => {
    return axios.get(`http://localhost:3000/comunity/usersFollowing/${id}`)
}

