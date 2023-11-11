import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tableData: [],
    tableDataLoading: false,
    tableDataError: null,
}

const tableDataSlice = createSlice({
    name: "tableData",
    initialState: initialState,
    reducers: {
        tableDataLoadingAction(state,action){
            state.tableDataLoading = action.payload
        },
        tableDataErrorAction(state,action){
            state.tableDataError = action.payload
        },
        tableDataAction(state,action){
            state.tableData = action.payload
        },
        tableDataStateReseter(state){
            state.tableData = null
            state.tableDataLoading = false
            state.tableDataError = null
        }
    }
})

export const tableDataActions = tableDataSlice.actions;
export default tableDataSlice.reducer;