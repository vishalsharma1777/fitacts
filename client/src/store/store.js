import { configureStore } from "@reduxjs/toolkit";
import signupReducer from './signupSlice'
import signinReducer from './signinSlice'
import activitiesReducer from './activitySlice'


const store = configureStore({
  reducer: {
    signUp: signupReducer,
    signIn: signinReducer,
    activites:activitiesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export default store;