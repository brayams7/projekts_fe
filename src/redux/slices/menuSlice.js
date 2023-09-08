import { createSlice } from "@reduxjs/toolkit";
// import { MenuItemsHome, MenuWorkspace, typesMenu } from "../../Menu";
// import { mapMenuWithoutIcon } from "../../utilsFunctions/auth";

// const menuHome = mapMenuWithoutIcon(MenuItemsHome)
// const menuWorkspace = mapMenuWithoutIcon(MenuWorkspace)

const initialState = {
  // menuHome,
  // menuWorkspace,
  // typeMenuSelect:typesMenu.HOME
}

export const menuSlice = createSlice({
  name:"menu",
  initialState,
  reducers:{
    setMenuHome:(state, action)=>{
      state.menuHome = action.payload
    },
    setMenuWorkspace:(state, action)=>{
      state.menuWorkspace = action.payload
    },
    setTypeMenuSelect:(state, action)=>{
      state.typeMenuSelect = action.payload
    }
  }
})

export const {
  setMenuHome,
  setMenuWorkspace,
  setTypeMenuSelect
} = menuSlice.actions

export default menuSlice.reducer
