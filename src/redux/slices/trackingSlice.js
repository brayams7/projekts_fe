import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trackingSelect: null,
  isLoadingDelete: false,
  isErrorDelete: false,
  errorDelete:null
}

export const trackingSlice = createSlice({
  name:"tracking",
  initialState,
  reducers:{
    setIsLoadingDelete:(state, action)=>{
      state.isLoadingDelete = action.payload
    },
    setIsErrorDelete:(state, action)=>{
      state.isErrorDelete = action.payload
    },
    setErrorDelete:(state, action)=>{
      state.errorDelete = action.payload
    },

    setTrackingSelect:(state, action)=>{
      state.trackingSelect = action.payload
    }
  }
})

export const {
  setIsLoadingDelete,
  setIsErrorDelete,
  setErrorDelete,
  setTrackingSelect
} = trackingSlice.actions

export default trackingSlice.reducer
