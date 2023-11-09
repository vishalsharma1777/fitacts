import { createSlice } from "@reduxjs/toolkit";

const intialStateSignup = {
    signupLoading:true,
    signupStatus:null,
    signupMessage:null,
    signedupUser:null,
    sigupSuccess:false,
    signupError:null,
}

const signupSlice = createSlice({
    name: "signup",
    initialState: intialStateSignup,
    reducers: {
        signupLoadingAction(state,action){
            state.signupLoading = action.payload
        },
        signupStatusAction(state,action){
            state.signupStatus = action.payload
        },
        signupMessageAction(state,action){
            state.signupMessage = action.payload
        },
        signedupUserAction(state,action){
            state.signedupUser = action.payload
        },
        sigupSuccessAction(state,action){
            state.sigupSuccess = action.payload
        },
        signupErrorAction(state,action){
            state.signupError = action.payload
        },
        sigupStateReseter(state){
            state.signupLoading = true
            state.signupStatus = null
            state.signupMessage = null
            state.signedupUser = null
            state.sigupSuccess = false
            state.signupError = null
        }
    }
})

export const signupActions = signupSlice.actions;

export default signupSlice.reducer;