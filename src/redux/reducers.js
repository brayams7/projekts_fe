import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import { apiSlice } from "../rtkQuery/apiSlice";
import boardSlice from "./slices/boardSlice";
import layoutSlice from "./slices/layoutSlice";
import menuSlice from "./slices/menuSlice";
// import { apiSlice } from "../services/apiSlice";
// import postsSlice from "./slices/postsSlice";
export const reducer =  combineReducers({
    auth:authSlice,
    board:boardSlice,
    layout:layoutSlice,
    menu:menuSlice,
    [apiSlice.reducerPath]:apiSlice.reducer
})

