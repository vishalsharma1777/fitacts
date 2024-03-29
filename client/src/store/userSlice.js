import { createSlice } from "@reduxjs/toolkit";

const intialStateUser = {
    userLoading: true,
    userError: null,
    user: null,
    userFavActivities: [],
    userFavWithDetails: [],
    userFavWithDetailsLoading: true,
    userFavWithDetailsError: '',
    userAdhar: false,
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
        userFavWithDetailsAction(state, action) {
            state.userFavWithDetailsLoading = false
            state.userFavWithDetails = action.payload
        },
        userFavWithDetailsErrorAction(state, action) {
            state.userFavWithDetailsLoading = false
            state.userFavWithDetailsError = action.payload
        },
        userAdharAction(state, action) {
            state.userAdhar = action.payload
        },

        userReseter(state) {
            state.userLoading = true
            state.userError = null
            state.user = null
            state.userFavActivities = []
            state.userFavWithDetails = []
            state.userFavWithDetailsLoading = true
            state.userFavWithDetailsError = ''
            state.userAdhar = false
        }
    }
})

export const userActions = userSlice.actions;

export default userSlice.reducer;