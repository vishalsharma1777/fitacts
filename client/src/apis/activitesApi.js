import axios from 'axios';

export const getActivities =()=>{
    return axios.get("http://localhost:3000/activity/allActivities")
}

export const updateFavActivity = (updateDetails) => {
    return axios.put("http://localhost:3000/user/updateFavActivity", updateDetails)
}

export const getUserFavActivites = (user_id) => {
    return axios.get(`http://localhost:3000/user/getUserFavActivites/${user_id}`)
}

export const getFavoriteActivitiesDetails = (user_id) => {
    return axios.get(`http://localhost:3000/activity/favActivities/${user_id}`)
}
