import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_COLORS_LAYOUT } from "../../utils/contants/colorsHex";

const defaultStylesLayout = DEFAULT_COLORS_LAYOUT

const initialState = {
  stylesLayout:{
    header: defaultStylesLayout.header,
    siderbar:defaultStylesLayout.siderbar,
    content:defaultStylesLayout.content,
    board:defaultStylesLayout.board
  }
}

export const layoutSlice = createSlice({
  name:"layout",
  initialState,
  reducers:{
    setSytlesContent:(state, action)=>{
      const styles = action.payload ? action.payload : DEFAULT_COLORS_LAYOUT.content
      state.stylesLayout.content = styles
    },
    setSytlesBoard:(state, action)=>{
      // const styles = {...state.stylesLayout.board, ...action.payload}
      state.stylesLayout.board = action.payload
    },
    setSytlesHeader:(state, action)=>{
      // const styles = {...state.stylesLayout.header, ...action.payload}
      state.stylesLayout.header = action.payload
    },
    setSytlesSiderbar:(state, action)=>{
      // const styles = {...state.stylesLayout.siderbar, ...action.payload}
      state.stylesLayout.siderbar = action.payload
    }
  }
})

export const {
  setSytlesContent,
  setSytlesBoard,
  setSytlesHeader,
  setSytlesSiderbar
} = layoutSlice.actions

export default layoutSlice.reducer
