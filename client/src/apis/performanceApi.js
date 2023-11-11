import axios from 'axios';

export const createPerformance = (performanceDetails) => {
    return axios.post('http://localhost:3000/performance/createperformance', performanceDetails);
}

export const getUserperformance = (user_id,activityId)=>{
    return axios.get(`http://localhost:3000/performance/userperformance/${user_id}/${activityId}`)
}

export const deletePerformance = (user_id,activityId,performanceId)=>{
    return axios.delete(`http://localhost:3000/performance/deleteperformance/${user_id}/${activityId}/${performanceId}`)
}


export const updateTimeline = (user_id,performanceId)=>{
    return axios.put(`http://localhost:3000/performance/updatetimeline/${user_id}/${performanceId}`)
}
