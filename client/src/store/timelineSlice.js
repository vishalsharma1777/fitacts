import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timeline: [],
    timelineLoading: true,
    timelineError: null,
}

const timelineSlice = createSlice({
    name: 'timeline',
    initialState: initialState,
    reducers: {
        timelineLoadingAction: (state) => {
            state.timelineLoading = true;
        },
        timelineSuccessAction: (state, action) => {
            state.timeline = action.payload;
            state.timelineLoading = false;
            state.timelineError = null;
        },
        timelineErrorAction: (state, action) => {
            state.timeline = [];
            state.timelineLoading = false;
            state.timelineError = action.payload;
        },
        timelineResetAction: (state) => {
            state.timeline = [];
            state.timelineLoading = true;
            state.timelineError = null;
        },
    },
});

export const timelineActions = timelineSlice.actions;
export default timelineSlice.reducer;
