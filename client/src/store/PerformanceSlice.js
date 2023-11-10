import { createSlice } from "@reduxjs/toolkit";

const initialStatePerformance = {
    performance_name:null,
    performance_duration:0,
    performance_speed:0,
    performance_distance:0,
    performance_mts:true,
    performance_user_id:null,
    performance_activity_id:null,
    performance_activity_name:null,
    performance_unit:null,
}

const performanceSlice = createSlice({
    name: "performance",
    initialState: initialStatePerformance,
    reducers: {
        performanceNameAction(state,action){
            state.performance_name = action.payload
        },
        performanceDurationAction(state,action){
            state.performance_duration = action.payload
        },
        performanceSpeedAction(state,action){
            state.performance_speed = action.payload
        },
        performanceMtsAction(state,action){
            state.performance_mts = action.payload
        },
        performanceUserIdAction(state,action){
            state.performance_user_id = action.payload
        },
        performanceActivityIdAction(state,action){
            state.performance_activity_id = action.payload
        },
        performanceDistanceAction(state,action){
            state.performance_distance = action.payload
        },
        performanceActivityNameAction(state,action){
            state.performance_activity_name = action.payload
        },
        performanceUnitActions(state,action){
            state.performance_unit = action.payload
        },
        performanceStateReseter(state){
            state.performance_name = null
            state.performance_duration = 0
            state.performance_speed = 0
            state.performance_mts = true
            state.performance_user_id = null
            state.performance_activity_id = null
            state.performance_distance = 0,
            state.performance_activity_name = null,
            state.performance_unit=null
        }
    }
})

export const performanceActions = performanceSlice.actions;

export default performanceSlice.reducer;