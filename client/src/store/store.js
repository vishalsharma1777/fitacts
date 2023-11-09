import { configureStore } from "@reduxjs/toolkit";
import signupReducer from './signupSlice'
import signinReducer from './signinSlice'


const store = configureStore({
  reducer: {
    signUp: signupReducer,
    signIn: signinReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export default store;