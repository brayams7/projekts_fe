import { sortAscByOrder } from "../utilsFunctions/generalFuntions";
import { apiSlice } from "./apiSlice";
import { TYPES_BOARD } from "./providesTags";

export const apiSliceBoard = apiSlice.injectEndpoints({
  endpoints:(buider)=>({
    getBoardsByWorkspaceAndUser: buider.query({
      query:({idWorkspace,userId})=>({
        url:`/boards/${idWorkspace}/${userId}`
      }),
      providesTags: (result, error, {idWorkspace}) => {
        return [{type:TYPES_BOARD.TYPE_LIST_BOARDS_BY_WORKSPACE_AND_USER, id:idWorkspace}]
      },
      transformResponse: (result) => result.response,
    }),

    getBoardsAndStages:buider.query({
      query:(boardId)=>({
        url:`/getDetailBoard/${boardId}`
      }),
      providesTags: (result, error, boardId) => {
        return [
          {type:TYPES_BOARD.TYPE_DETAIL_BOARD, id:boardId},
          {type:TYPES_BOARD.TYPE_DETAIL_BOARD, id:'ALL'},
        ]
      },
      transformResponse: (result) => {
        const {response} = result
        const sortStages = sortAscByOrder(response.stages || [])
        response.stages = sortStages

        return response
      },
    }),
    createNewBoard: buider.mutation({
      query:(body)=>({
        url:`/boards`,
        method:"POST",
        body
      }),
      // transformResponse: (response) => {
      //   console.log({response})
      // },
      invalidatesTags:(result) => {
        const {response} = result
        return [{type:TYPES_BOARD.TYPE_LIST_BOARDS_BY_WORKSPACE_AND_USER, id:response.workspace_id}]
      }
    }),
    updateBoard: buider.mutation({
      query:({boardId,body})=>({
        url:`/board/update/${boardId}`,
        method:"POST",
        body
      }),
      async onQueryStarted({boardId}, {dispatch, queryFulfilled}){
        try {
          const {data:updateBoard} = await queryFulfilled
          if(updateBoard.code === 200){

            const board = updateBoard.response

            // const idUser = newPost.userId
            dispatch(
              apiSlice.util.updateQueryData('getBoardsAndStages', boardId, (draftBoard) => {

                draftBoard.name = board.name

                return draftBoard

              })
            )
          }
          // apiSlice.endpoints.getPosts.useQuery({postId, like})

        } catch {
          console.log("error")
        }
      }
    })
  })
})

export const {
  useGetBoardsByWorkspaceAndUserQuery,
  useLazyGetBoardsByWorkspaceAndUserQuery,
  useGetBoardsAndStagesQuery,
  useCreateNewBoardMutation,
  useUpdateBoardMutation
} = apiSliceBoard
