import { apiSlice } from "./apiSlice";
import { TYPES_WORKSPACE } from "./providesTags";

import dayjs from "dayjs";
import 'dayjs/locale/de'

export const apiSliceWorkspace = apiSlice.injectEndpoints({
  endpoints: (builder)=>({
    getAllWorkspaces: builder.query({
      query:()=>({
        url:'/workpaces'
      }),
      providesTags:[TYPES_WORKSPACE.TYPE_LIST_WORKSPACES],
      keepUnusedDataFor: 120,
    }),
    getWorkspaceByID: builder.query({
      query:(workspaceId)=>({
        url:`/workpace/${workspaceId}`
      }),
      providesTags:[TYPES_WORKSPACE.TYPE_WORKSPACE_BY_ID],
      transformResponse:(result)=>result.response,
      keepUnusedDataFor: 120,
    }),

    getAllWorkspacesUser: builder.query({
      query:(idUser)=>({
        url:`/workpaces/user/${idUser}`
      }),
      providesTags: (result) => {
        const list = result.response || []
        return result && Array.isArray(list) ? [
          ...list.map(({ id }) => ({ type: TYPES_WORKSPACE.TYPE_LIST_WORKSPACES_USER, id:id })),
          { type: TYPES_WORKSPACE.TYPE_LIST_WORKSPACES_USER, id: TYPES_WORKSPACE.TYPE_LIST_WORKSPACES_USER },
        ]
        :
        [{ type: TYPES_WORKSPACE.TYPE_LIST_WORKSPACES_USER, id: TYPES_WORKSPACE.TYPE_LIST_WORKSPACES_USER }]
      },
      transformResponse: (result) => {
        const response = result.response;
        let list = []
        try {
          list = [...response.myWorkspaces, ...response.guestWorkspaces]
          if (Array.isArray(list)) {
            const data = list.map((item) => {
              const createDate = dayjs(item.created_at)
              const updateDate = dayjs(item.updated_at)
              const created_at = createDate.format("DD/MM/YYYY HH:mm:ss")
              const updated_at = updateDate.format("DD/MM/YYYY HH:mm:ss")
              return {
                ...item,
                label:item.name,
                value:item.id,
                created_at,
                updated_at
              };
            });

            list = data;
          }
        } catch (error) {
          console.log(error);
        }

        return list;
      },
      keepUnusedDataFor: 120,

    }),

    updateWorkspace: builder.mutation({
      query:({body, workspaceId})=>{
        return {
          url:`/workpaces/${workspaceId}`,
          method:"PUT",
          body
        }
      },
      invalidatesTags:[TYPES_WORKSPACE.TYPE_WORKSPACE_BY_ID]
    }),

    //invite a user through email
    inviteMemberToWorkspace:builder.mutation({
      query:({body, workspaceId})=>{
        return {
          url:`/workspace/inviteMemberToWorkspace/${workspaceId}`,
          method:"POST",
          body
        }
      },
      invalidatesTags:[TYPES_WORKSPACE.TYPE_WORKSPACE_BY_ID]
    }),
    acceptInvitationOfTheWorkspace:builder.mutation({
      query:({body})=>{
        return {
          url:`/workspace/acceptInvitationToWorkspace/`,
          method:"POST",
          body
        }
      },
      invalidatesTags:[TYPES_WORKSPACE.TYPE_WORKSPACE_BY_ID]
    })
  })
})

export const {
  useGetAllWorkspacesQuery,
  useGetAllWorkspacesUserQuery,
  useGetWorkspaceByIDQuery,
  useUpdateWorkspaceMutation,
  useInviteMemberToWorkspaceMutation,
  useAcceptInvitationOfTheWorkspaceMutation
} = apiSliceWorkspace
