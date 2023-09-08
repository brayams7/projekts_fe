import { apiSlice } from "./apiSlice";
import { TYPES_BOARD } from "./providesTags";


export const apiSliceFeature = apiSlice.injectEndpoints({
  endpoints:(builder)=>({
    createFeature: builder.mutation({
      query:(body)=>({
        url:`/createFeature`,
        method:"POST",
        body
      }),
      invalidatesTags:(result, error,body) => [{type:TYPES_BOARD.TYPE_DETAIL_BOARD, id:body.board_id}]
    }),
  })
})


export const {
  useCreateFeatureMutation
} = apiSliceFeature
