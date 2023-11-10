import { createSlice } from "@reduxjs/toolkit";

const intialStateUser = {
    userLoading: true,
    userError: null,
    user: null,
    userFavActivities: [],
}

const userSlice = createSlice({
    name: "user",
    initialState: intialStateUser,
    reducers: {
        userLoadingAction(state, action) {
            state.userLoading = action.payload
        },
        userErrorAction(state, action) {
            state.userError = action.payload
        },
        userAction(state, action) {
            state.user = action.payload
        },
        userFavActivitiesAction(state, action) {
            state.userFavActivities = action.payload
        },
        userReseter(state) {
            state.userLoading = true
            state.userError = null
            state.user = null
            state.userFavActivities = []
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;