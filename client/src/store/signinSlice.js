import { createSlice } from "@reduxjs/toolkit";

const intialStateSignin = {
    signinLoading:true,
    signinStatus:null,
    signinMessage:null,
    signedinUser:null,
    siginSuccess:false,
    signinError:null,
}

const signinSlice = createSlice({
    name: "signin",
    initialState: intialStateSignin,
    reducers: {
        signinLoadingAction(state,action){
            state.signinLoading = action.payload
        },
        signinStatusAction(state,action){
            state.signinStatus = action.payload
        },
        signinMessageAction(state,action){
            state.signinMessage = action.payload
        },
        signedinUserAction(state,action){
            state.signedinUser = action.payload
        },
        siginSuccessAction(state,action){
            state.siginSuccess = action.payload
        },
        signinErrorAction(state,action){
            state.signinError = action.payload
        },
        siginStateReseter(state){
            state.signinLoading = true
            state.signinStatus = null
            state.signinMessage = null
            state.signedinUser = null
            state.siginSuccess = false
            state.signinError = null
        }
    }
})

export const signinActions = signinSlice.actions;

export default signinSlice.reducer;