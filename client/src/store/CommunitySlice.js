import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    community: [],
    loading: true,
    error: null,
    followingPeople: [],
};

const communitySlice = createSlice({
    name: "community",
    initialState,
    reducers: {
        getcommunitySuccess(state, action) {
            state.loading = false;
            state.community = action.payload;
        },
        getcommunityFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getFollowingPeopleSuccess(state, action) {
            state.loading = false;
            state.followingPeople = action.payload;
        },
        communityStateReseter(state) {
            state.community = [];
            state.followingPeople = [];
            state.loading = true;
            state.error = null;
        }
    },
});


export const communityActions = communitySlice.actions;

export default communitySlice.reducer;

