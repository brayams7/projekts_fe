// import { createColumnHelper } from "@tanstack/react-table"
import { useCallback, useEffect, useState } from "react"
// import { useModal } from "../modal/useSimpleModal"
// import { useListTasksOfFeatureQuery } from "../../rtkQuery/apiSliceTasks"
// import ColumnTagsUser from "../../components/tasks/columnTagsUser/ColumnTagsUser"
// import DropdowActionRow from "../../components/tasks/listTaks/DropdowActionRow"
// import dayjs from "dayjs"
// import ColumnUsersAssignedToTask from "../../components/tasks/columUsersAssignedToTask/ColumnUsersAssignedToTask"
import { getListTasksOfFeatureService, getSubtasksOfTask } from "../../services/tasksService"
import { useDispatch, useSelector } from "react-redux"
import { setListTasks } from "../../redux/slices/tasksSlice"



// const columnHelper = createColumnHelper()

export const useListTasks = ({
  feature
}) => {

  // const [listTasks, setListTask] = useState([])
  // const {isOpen, onOpen, onClose } = useModal()
  const [selectedTask, setSelectedTask] = useState(null)
  const [selectedTaskParent, setSelectedParent] = useState(null)
  const [isRowLoading, setIsRowLoading] = useState({})
  const [isLoading, setLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const listTasks = useSelector(state => state.task.listTasks)
  const dispatch = useDispatch()


  // const {
  //   isLoading,
  //   isError,
  //   data,
  //   currentData
  // } = useListTasksOfFeatureQuery(feature?.id, {
  //   refetchOnMountOrArgChange: true
  // })


  // const insertListUsersAddedToTheWorkspace = (tasks = [], listUsersAddedToTheWorkspace)=>{

  //   return [...tasks].map((task)=>{
  //     if(Array.isArray(task.sub_tasks)){
  //       task.sub_tasks = insertListUsersAddedToTheWorkspace(task.sub_tasks, listUsersAddedToTheWorkspace)
  //     }

  //     return {
  //       ...task,
  //       list_of_users_added_to_the_workspace:listUsersAddedToTheWorkspace
  //     }
  //   })
  // }

  // const handleCloseModal = ()=>{
  //   onClose()
  //   setSelectedTask(null)
  //   setSelectedParent(null)
  // }

  const handleClickRow = async ({id, row})=>{

    setIsRowLoading({[id]:true})
    const response = await getSubtasksOfTask(id)

    if(response.code !== 200){
      setIsRowLoading({[id]:false})
      return
    }

    if(Array.isArray(response.data)){
      const listChildren = response.data

      const newList = listTasks.map((parent)=>{
        if(parent.id === id){
          row.originalSubRows = listChildren
          row.subRows = listChildren

          return {
            ...parent,
            sub_tasks:[...listChildren]
          }
        }
        return parent
      })
      // console.log(row)
      // console.log(newList)
      dispatch(setListTasks(newList))
      // setListTask(listParents =>{
      //   const newList = listParents.map((parent)=>{
      //     if(parent.id === id){
      //       const listUsersAddedToTheWorkspace = row.original?.list_of_users_added_to_the_workspace ?? []
      //       const mapDataTasks = insertListUsersAddedToTheWorkspace(data, listUsersAddedToTheWorkspace)
      //       row.originalSubRows = data
      //       row.subRows = data

      //       return {
      //         ...parent,
      //         sub_tasks:[...data]
      //       }
      //     }
      //     return parent
      //   })

      //   return newList
      // })


      // setRowIdExpanded(id)
    }

    setIsRowLoading({[id]:false})
  }

  const getListTasks = useCallback(async()=>{

    try {
      if(!feature?.id) return

      setLoading(true)
      dispatch(setListTasks([]))
      const response = await getListTasksOfFeatureService(feature?.id)
      if(response.code === 200){

        const currentDate = new Date()

        const listTasks = response.data.map((task)=>{
          task.sub_tasks = []
          const finDate = task.due_date ? new Date(task.due_date * 1000) : null
          task.time_has_passed = currentDate > finDate
          return task
        })

        dispatch(setListTasks([...listTasks]))
      }
      setIsError(false)
    } catch (error) {
      dispatch(setListTasks([]))
      setIsError(true)
    }finally{
      setLoading(false)
    }

  }, [feature?.id, dispatch])

  useEffect(()=>{
    getListTasks()
  },[getListTasks, feature.id])

  // useEffect(()=>{
  //   if(Array.isArray(data)){

  //     const mapDataTask = data.map(task=>({
  //       ...task,
  //       list_of_users_added_to_the_workspace:feature.list_of_users_added_to_the_workspace
  //     }))

  //     setListTask(data)

  //   }
  // },[data, feature])


  return {
    listTasks,
    selectedTask,
    // setListTask:setListTasks,
    setSelectedTask,
    setSelectedParent,
    selectedTaskParent,
    isLoading,
    isError,
    // currentData,
    isRowLoading,
    handleClickRow
  }

}
