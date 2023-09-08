import { createSlice } from "@reduxjs/toolkit";
import { getTokenCookie, getUserDataCookie, getUserPermissionsCookie, getUserRolCookie } from "../../helpers/authCookies";

const user = getUserDataCookie()
const role = getUserRolCookie()
const permissions = getUserPermissionsCookie()
const token = getTokenCookie()

const initialState = {
  user: user ? user : {},
  rol: role ? role : {},
  permissions: permissions ? permissions : {},
  token: token ? token : "",
  loading: false,
  isError: false,
  error:""
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRol: (state, action) => {
      state.rol = action.payload;
    },
    setPermissions: (state, action) => {
      state.permissions = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setUser,
  setLoading,
  setIsError,
  setToken,
  setPermissions,
  setRol,
  setError
} = authSlice.actions;

export default authSlice.reducer;
