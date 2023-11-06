import dayjs from "dayjs";
import { apiSlice } from "./apiSlice";
import { TYPES_BOARD, TYPES_FEATURE } from "./providesTags";
import { attachmentsIcons, mimeTypesImages } from "../utils/contants/attachments";

dayjs.locale('es')

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
    changeOrderFeature: builder.mutation({
      query:({featureId,body})=>({
        url:`/changeOrderFeatureOrMovingToAnotherStage/${featureId}`,
        method:"PUT",
        body
      }),
      invalidatesTags:(result, error,{body, featureId}) => [{type:TYPES_BOARD.TYPE_DETAIL_BOARD, id:body.board_id},{type:TYPES_FEATURE.TYPE_DETAIL_FEATURE, id:featureId}]
    }),

    updateFeature: builder.mutation({
      query:({featureId,body})=>({
        url:`/updateFeature/${featureId}`,
        method:"PUT",
        body
      }),
      async onQueryStarted({featureId}, {dispatch, queryFulfilled}){
        try {
          const {data:updateFeature} = await queryFulfilled
          if(updateFeature.code === 200){

            const feature = updateFeature.response

            // const idUser = newPost.userId
            dispatch(
              apiSlice.util.updateQueryData('getDetailFeature', featureId, (draftBoard) => {

                draftBoard.title = feature.title
                draftBoard.description = feature.description
                draftBoard.due_date = feature.due_date
                return draftBoard

              })
            )
          }
          // apiSlice.endpoints.getPosts.useQuery({postId, like})

        } catch {
          console.log("error")
        }
      }
      // invalidatesTags:(result, error,{body, featureId}) => [{type:TYPES_BOARD.TYPE_DETAIL_BOARD, id:body.board_id},{type:TYPES_FEATURE.TYPE_DETAIL_FEATURE, id:featureId}]
    }),

    assignFeatureToUser: builder.mutation({
      query:(body)=>({
        url:`/assignFeatureToUser`,
        method:"POST",
        body
      }),
      invalidatesTags:(result, error,body) => [{id:body.board_id},{type:TYPES_FEATURE.TYPE_DETAIL_FEATURE, id:body.feature_id}]
    }),

    changeVisibilityFromUserToAFeature: builder.mutation({
      query:(body)=>({
        url:`/changeVisibilityFromUserToAFeature`,
        method:"POST",
        body
      }),
      async onQueryStarted({feature_id,user_id,is_watcher}, {dispatch, queryFulfilled}){
        try {
          const {data:updateFeature} = await queryFulfilled

          if(updateFeature.code === 200){

            dispatch(
              apiSlice.util.updateQueryData('getDetailFeature', feature_id, (draftFeature) => {

                draftFeature.list_of_users_assigned = draftFeature.list_of_users_assigned.map(user=>{
                  if(user.id === user_id) user.is_watcher = is_watcher
                  return user
                })

                return draftFeature

              })
            )

          }
          // apiSlice.endpoints.getPosts.useQuery({postId, like})

        } catch {
          console.log("error")
        }
      }
      // invalidatesTags:(result, error,body) => [{type:TYPES_FEATURE.TYPE_DETAIL_FEATURE, id:body.feature_id}]
    }),

    getDetailFeature: builder.query({
      query:(featureId)=>({
        url:`/getDetailFeature/${featureId}`
      }),
      providesTags: (result, error, featureId) => {
        return [
          {type:TYPES_FEATURE.TYPE_DETAIL_FEATURE, id:featureId},
          {type:TYPES_FEATURE.TYPE_DETAIL_FEATURE, id:'ALL'},
        ]
      },
      transformResponse: (result) => {

        try {
          const data = {...result.response}
          if(Object.keys(data).length > 0){
            const createDate = dayjs(data.created_at)
            const updateDate = dayjs(data.updated_at)
            data.created_at = createDate.format("MMM. DD YYYY, HH:mm a")
            data.updated_at = updateDate.format("MMM. DD YYYY, HH:mm a")
          }

          return data

        } catch (error) {
          console.log(error)
          return {}
        }
      },
      keepUnusedDataFor: 60,
    }),

    deleteUserToFeature: builder.mutation({
      query:(body)=>({
        url:`/deleteUserToFeature`,
        method:"POST",
        body
      }),
      invalidatesTags:(result, error,body) => [{type:TYPES_FEATURE.TYPE_DETAIL_FEATURE, id:body.feature_id}]
    }),

    listAttachmentsOfFeature: builder.query({
      query:(featureId)=>({
        url:`/listAttachmentsOfFeature/${featureId}`
      }),
      providesTags: (result, error, featureId) => {
        return [
          {type:TYPES_FEATURE.TYPE_LIST_ATTACHMENTS, id:featureId},
          {type:TYPES_FEATURE.TYPE_LIST_ATTACHMENTS, id:'ALL'},
        ]
      },
      transformResponse: (result) => {

        try {
          const data = [...result.response]
          if(Object.keys(data).length > 0){
            return data.map(att =>{

              const createDate = dayjs(data.created_at)
              att.created_at = createDate.format("MMM. DD YYYY, HH:mm a")

              const isImage = mimeTypesImages.some(icon => icon.includes(att.attachment_type.extension))
              const itemIcon =  attachmentsIcons.find(icon => icon.extensions.includes(att.attachment_type.extension))

              att.iconPreview = itemIcon?.icon || null
              att.isImage = isImage

              return att
            })

          }
          return []
        } catch (error) {
          console.log(error)
          return []
        }
      },
    }),

    uploadAttachmentOfFeature: builder.mutation({
      query:({body, featureId})=>({
        url:`/addAttachmentToFeature/${featureId}`,
        method:"POST",
        body
      }),
      invalidatesTags:(result, error,{featureId}) => [{type:TYPES_FEATURE.TYPE_LIST_ATTACHMENTS, id:featureId}]
    }),

    deleteAttachmentOfFeature: builder.mutation({
      query:({attachmentId, featureId})=>({
        url:`/deleteAttachment/${featureId}/${attachmentId}`,
        method:"DELETE",
      }),
      async onQueryStarted({featureId,attachmentId}, {dispatch, queryFulfilled}){
        try {
          const {data:deleteFeature} = await queryFulfilled

          if(deleteFeature.code === 200){
            dispatch(
              apiSlice.util.updateQueryData('listAttachmentsOfFeature', featureId, (draftAttachments) => {
                return draftAttachments.filter(att=>att.id !== attachmentId)
              })
            )
          }
          // apiSlice.endpoints.getPosts.useQuery({postId, like})

        } catch {
          console.log("error")
        }
      }
      //invalidatesTags:(result, error,{featureId}) => [{type:TYPES_FEATURE.TYPE_LIST_ATTACHMENTS, id:featureId}]
    }),

    // Comentarios
    getFeatureComments: builder.query({
      query: (featureId) => ({
        url: `/listCommentsFeature/${featureId}`,
      }),
      providedTags: (_result, _error, featureId) => {
        return [{ type: TYPES_FEATURE.TYPE_LIST_COMMENTS, id: featureId }];
      },
      transformResponse: (result) => result.response
    })
  })
})


export const {
  useCreateFeatureMutation,
  useChangeOrderFeatureMutation,
  useAssignFeatureToUserMutation,
  useUpdateFeatureMutation,
  useDeleteUserToFeatureMutation,
  useGetDetailFeatureQuery,
  useListAttachmentsOfFeatureQuery,
  useUploadAttachmentOfFeatureMutation,
  useDeleteAttachmentOfFeatureMutation,
  useChangeVisibilityFromUserToAFeatureMutation,
  useGetFeatureCommentsQuery
} = apiSliceFeature
