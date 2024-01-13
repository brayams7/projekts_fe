import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { apiSlice } from "../rtkQuery/apiSlice";
import boardSlice from "./slices/boardSlice";
import layoutSlice from "./slices/layoutSlice";
import menuSlice from "./slices/menuSlice";
import featureSlice from "./slices/featureSlice";
import tasksSlice from "./slices/tasksSlice";
import trackingSlice from "./slices/trackingSlice";
// import { apiSlice } from "../services/apiSlice";
// import postsSlice from "./slices/postsSlice";
export const reducer =  combineReducers({
    auth:authSlice,
    board:boardSlice,
    layout:layoutSlice,
    menu:menuSlice,
    feature:featureSlice,
    task:tasksSlice,
    tracking:trackingSlice,
    [apiSlice.reducerPath]:apiSlice.reducer
})

