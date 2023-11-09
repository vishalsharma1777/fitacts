import { createSlice } from "@reduxjs/toolkit";

const intialStateActivity = {
    activityLoading: true,
    activityError: null,
    activities: [],

}

const activitySlice = createSlice({
    name: "activities",
    initialState: intialStateActivity,
    reducers: {
        activityLoadingAction(state, action) {
            state.activityLoading = action.payload
        },
        activityErrorAction(state, action) {
            state.activityError = action.payload
        },
        activitiesAction(state, action) {
            state.activities = action.payload
        },
        activityReseter(state){
            state.activityLoading = true
            state.activityError = null
            state.activities = []
        }


    }
})

export const activityActions = activitySlice.actions;

export default activitySlice.reducer;