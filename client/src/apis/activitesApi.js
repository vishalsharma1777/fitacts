import axios from 'axios';

export const getActivities =()=>{
    return axios.get("http://localhost:3000/activity/allActivities")
}