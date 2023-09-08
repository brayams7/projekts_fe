import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE } from "../services/settings";
import { setUser, setToken, setPermissions, setRol } from "../redux/slices/authSlice";
import { Mutex } from 'async-mutex'
import {
  getTokenCookie,
  removeRefreshTokenCookie,
  removeTokenCookie,
  removeUserDataCookie,
  setTokenCookie,
  removeUserPermissionsCookie,
  removeUserRolCookie
} from "../helpers/authCookies";

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE,
  prepareHeaders: (headers) => {
    const session = getTokenCookie()
    if (session) headers.set("Authorization", `Bearer ${session.token}`);
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if ((result.error && result.error.status === 401) || result.data.code === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {

      const release = await mutex.acquire()

      try {
        const session = getTokenCookie()
        console.log({session})
        const refreshResult = await baseQuery(
          {
            url:'/auth/refresh_token',
            method:'GET',
            headers:{
              "Authorization":`Bearer ${session.token}`
            }
          },
          api,
          extraOptions
        )

        if (refreshResult.data?.code === 200) {
          const session = refreshResult.data.response
          setTokenCookie(session)
          api.dispatch(setToken(session))

          result = await baseQuery(args, api, extraOptions)

        } else {
          removeUserDataCookie()
          removeTokenCookie()
          removeRefreshTokenCookie()
          removeUserPermissionsCookie()
          removeUserRolCookie()
          api.dispatch(setUser({}))
          api.dispatch(setToken({}))
          api.dispatch(setPermissions({}))
          api.dispatch(setRol({}))
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes:["Boards","Workspaces","Tasks"],
  endpoints: () =>({})
});


