import axios from 'axios';

export const getUsersWithAllDetails = () => {
    return axios.get('http://localhost:3000/community/usersWithAllDetails')
}

export const getUsersFollowing = (id) => {
    return axios.get(`http://localhost:3000/community/usersFollowing/${id}`)
}

export const addOrRemoveFollowing = (id, followingId) => {
    return axios.put(`http://localhost:3000/community/addOrRemoveFollowing/${id}`, { followingId })
}




