import { apiSlice } from "./apiSlice";
import { TYPES_BOARD } from "./providesTags";

export const apiSliceStage = apiSlice.injectEndpoints({
  endpoints:(builder)=>({
    createStageAndAssingToBoard: builder.mutation({
      query:({boardId, body})=>({
        url:`/createStageByAssignToBoard/${boardId}`,
        method:"POST",
        body
      }),
      invalidatesTags:(result, error, {boardId}) => [{type:TYPES_BOARD.TYPE_DETAIL_BOARD, id:boardId}]
    }),
    updateOrderStage: builder.mutation({
      query:({boardId, body})=>({
        url:`/updateOrderStagesByBoard/${boardId}`,
        method:"POST",
        body
      }),
      invalidatesTags:(result, error, {boardId}) => [
        {type:TYPES_BOARD.TYPE_DETAIL_BOARD, id:boardId},
      ]
    }),
    updateStageById: builder.mutation({
      query:({stageId, body})=>({
        url:`/updateStage/${stageId}`,
        method:"PUT",
        body
      }),
      invalidatesTags:() => [{type:TYPES_BOARD.TYPE_DETAIL_BOARD, id:'ALL'}]
    }),
  })
})

export const {
  useUpdateOrderStageMutation,
  useUpdateStageByIdMutation,
  useCreateStageAndAssingToBoardMutation
} = apiSliceStage
