import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  isError: false,
  error:""
};


export const featureSlice = createSlice({
  name:"detailFeature",
  initialState,
  reducers:{
    setLoading:(state, action)=>{
      state.loading = action.payload
    }
  }
})


export const {
  setLoading
} = featureSlice.actions

export default featureSlice.reducer;
