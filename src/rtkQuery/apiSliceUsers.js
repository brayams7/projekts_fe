import { apiSlice } from "./apiSlice"


export const apiSliceUsers = apiSlice.injectEndpoints({
  endpoints:(buider)=>({
    searchUsersByUsernameOrEmail: buider.mutation({
      query:({text=''})=>({
        method:'GET',
        url:`/users/searchUsersByEmailOrUsername?text=${text}`
      }),

      // transformResponse: (result) => result.response,
    }),
  })
})

export const  {
  useSearchUsersByUsernameOrEmailMutation
} = apiSliceUsers
