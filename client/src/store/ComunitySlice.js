import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    comunity: [],
    loading: true,
    error: null,
    followingPeople: [],
};

const comunitySlice = createSlice({
    name: "comunity",
    initialState,
    reducers: {
        getComunitySuccess(state, action) {
            state.loading = false;
            state.comunity = action.payload;
        },
        getComunityFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getFollowingPeopleSuccess(state, action) {
            state.loading = false;
            state.followingPeople = action.payload;
        },
        comunityStateReseter(state) {
            state.comunity = [];
            state.followingPeople = [];
            state.loading = true;
            state.error = null;
        }
    },
});


export const comunityActions = comunitySlice.actions;

export default comunitySlice.reducer;

