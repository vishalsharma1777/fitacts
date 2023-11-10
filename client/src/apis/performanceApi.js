import axios from 'axios';

export const createPerformance = (performanceDetails) => {
    return axios.post('http://localhost:3000/performance/createperformance', performanceDetails);
}

export const getUserperformance = (user_id,activityId)=>{
    return axios.get(`http://localhost:3000/performance/userperformance/${user_id}/${activityId}`)
}