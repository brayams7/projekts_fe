import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  listTasks: [],
}


const updateTaskRecursive = (tasks=[], id, update) => {

  return tasks.map(task => {
    if(task.id === id && update){
      if(update.count_children > 0){
        return {
          ...update,
          sub_tasks:task.sub_tasks
        }

      }else{
        return {
          ...update,
          sub_tasks:[]
        }
      }
    }
    if(Array.isArray(task.sub_tasks)){
      task.sub_tasks = updateTaskRecursive(task.sub_tasks, id, update)
    }
    return task
  })
}

export const tasksSlice = createSlice({
  name: "listTasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.listTasks.push(action.payload)
    },
    deleteTask: (state, action) => {
      state.listTasks = state.listTasks.filter(task => task.id !== action.payload)
    },
    updateTask: (state, action) => {
      state.listTasks = updateTaskRecursive(state.listTasks, action.payload.id, action.payload.task)
    },
    setListTasks: (state, action) => {
      state.listTasks = action.payload
    }
  }
})

export const {
  addTask,
  deleteTask,
  updateTask,
  setListTasks
} = tasksSlice.actions

export default tasksSlice.reducer
