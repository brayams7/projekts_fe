import { apiSlice } from "./apiSlice";
import { TYPES_TRACKING } from "./providesTags";

export const apiSliceTracking = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTrackingByTask: builder.query({
      query: (taksId) => ({
        url: `/tracking/${taksId}`,
      }),
      providesTags:(result, error, taksId) => [
        {type:TYPES_TRACKING.TYPE_LIST_TRACKING_TASK, id:taksId},
        {type:TYPES_TRACKING.TYPE_LIST_TRACKING_TASK, id:'ALL'},
      ],
    }),
    createTrackingToTask: builder.mutation({
      query: ({body, taskId}) => ({
        url: `/addTrackingToTask/${taskId}`,
        method: "POST",
        body,
      }),
    }),
    updateTracking: builder.mutation({
      query: ({body, trackingId}) => ({
        url: `/updateTracking/${trackingId}`,
        method: "PUT",
        body,
      }),
    }),
    deleteTracking: builder.mutation({
      query: (trackingId) => ({
        url: `/deleteTracking/${trackingId}`,
        method: "DELETE",
      }),
      // invalidatesTags: (result, error, trackingId) => [
      //   {type:TYPES_TRACKING.TYPE_LIST_TRACKING_TASK, id:trackingId},
      //   {type:TYPES_TRACKING.TYPE_LIST_TRACKING_TASK, id:'ALL'},
      // ],
    }),
  }),
})

export const {
  useCreateTrackingToTaskMutation,
  useUpdateTrackingMutation,
  useDeleteTrackingMutation
} = apiSliceTracking
