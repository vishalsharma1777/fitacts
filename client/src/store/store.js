import { configureStore } from "@reduxjs/toolkit";
import signupReducer from './signupSlice'
import signinReducer from './signinSlice'
import activitiesReducer from './activitySlice'
import userReducer from './userSlice'
import performanceReducer from './PerformanceSlice'
import tableReducer from './TableDataSlice'
import timelineReducer from './timelineSlice'


const store = configureStore({
  reducer: {
    signUp: signupReducer,
    signIn: signinReducer,
    activites:activitiesReducer,
    user:userReducer,
    performance:performanceReducer,
    table:tableReducer,
    timeline:timelineReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export default store;