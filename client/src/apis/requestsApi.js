import axios from 'axios';


export const getUsersSendRequests = (id) => {
    return axios.get(`http://localhost:3000/request/usersSendRequests/${id}`)
}

export const getUsersReceivedRequests = (id) => {
    return axios.get(`http://localhost:3000/request/usersReceivedRequests/${id}`)
}

export const acceptRequest = (userId, followerId) => {
    return axios.put(`http://localhost:3000/request/acceptRequest`, { userId, followerId })
}

export const rejectRequest = (userId, followerId) => {
    return axios.put(`http://localhost:3000/request/rejectRequest`, { userId, followerId })
}

export const getStatus = (id) => {
    return axios.get(`http://localhost:3000/request/getStatus/${id}`)
}

export const requestAction = (userId, followerId, action) => {
    return axios.post(`http://localhost:3000/request/requestAction`, { userId, followerId, action })
}