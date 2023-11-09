import { createSlice } from "@reduxjs/toolkit";

const intialStateSignup = {
    signupLoading:true,
    signUpStatus:null,
    signupMessage:null,
}

const signupSlice = createSlice({
    name: "signup",
    initialState: intialStateSignup,
    reducers: {
        signupLoadingAction(state,action){
            state.signupLoading = action.payload
        },
        signUpStatusAction(state,action){
            state.signUpStatus = action.payload
        },
        signupMessageAction(state,action){
            state.signupMessage = action.payload
        }
    }
})

export const signupActions = signupSlice.actions;

export default signupSlice.reducer;