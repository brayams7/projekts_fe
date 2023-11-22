import dayjs from "dayjs";
import { apiSlice } from "./apiSlice";
import { TYPES_TASKS } from "./providesTags";
import { formatTime } from "../utilsFunctions/generalFuntions";


export const apiSliceTasks = apiSlice.injectEndpoints({
  endpoints:(builder)=>({
    listTasksOfFeature:builder.query({
      query:(featureId)=>({
        url:`/listTaskOfFeature/${featureId}`
      }),
      providesTags: (result, error, featureId) => {
        return [
          {type:TYPES_TASKS.TYPE_LIST_TASKS, id:featureId},
          {type:TYPES_TASKS.TYPE_LIST_TASKS, id:'ALL'},
        ]
      },
      transformResponse: (result) => {
        let list = []
        try {
          const data = [...result.response]
          if(Array.isArray(data)){

            list = data.map(task =>{
              const createDate = dayjs(task.created_at)
              task.created_at = createDate.format("MMM. DD, HH:mm")
              task.sub_tasks = []
              task.calculated_time = task?.calculated_time ? formatTime(task.calculated_time) : ''
              const currentDate = new Date()
              const finDate = task.due_date ? new Date(task.due_date * 1000) : null
              task.time_has_passed = currentDate > finDate
              // task.starts_at = task.starts_at ?? dayjs(task.starts_at).format("MMM. DD, HH:mm")
              // task.due_date = task.due_date ?? dayjs(task.due_date).format("MMM. DD YYYY, HH:mm a")
              // task.calculated_time = task.calculated_time ?? dayjs(task.calculated_time).format("MMM. DD YYYY, HH:mm a")
              return task
            })

          }

        } catch (error) {
          console.log(error)
        }
        return list
      },
    }),
    listSubtasksOfTask:builder.query({
      query:(taskId)=>({
        url:`/listChildrenTask/${taskId}`
      }),
      providesTags: (result, error, taskId) => {
        return [
          {type:TYPES_TASKS.TYPE_LIST_TASKS, id:taskId},
          {type:TYPES_TASKS.TYPE_LIST_TASKS, id:'ALL'},
        ]
      },
      transformResponse: (result) => {
        let list = []
        try {
          const data = [...result.response]
          if(Array.isArray(data)){
            list = data.map(subtask =>{
              const createDate = dayjs(subtask.created_at)
              subtask.created_at = createDate.format("MMM. DD, HH:mm")
              return subtask
            })
          }
        } catch (error) {
          console.log(error)
        }
        return list
      },
    }),
    createTask: builder.mutation({
      query:(body)=>({
        url:`/createTask`,
        method:"POST",
        body
      }),
      invalidatesTags:(result, error,body) => [{type:TYPES_TASKS.TYPE_LIST_TASKS, id:body.feature_id}]
    }),
    updateTask: builder.mutation({
      query:({taskId,body})=>({
        url:`/updateTask/${taskId}`,
        method:"PUT",
        body
      }),
      invalidatesTags:(result, error,{body}) => [{type:TYPES_TASKS.TYPE_LIST_TASKS, id:body.feature_id}]
    }),
  })
})

export const {
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useListTasksOfFeatureQuery,
  useListSubtasksOfTaskQuery,
  useLazyListSubtasksOfTaskQuery
} = apiSliceTasks
