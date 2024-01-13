import React, { forwardRef, memo, useCallback, useEffect, useState } from "react"
import { DescriptionIcon, ManualIcon, MoreTimeIcon, ScheduleIcon } from "../../../utils/icons/iconsMenu"

import './tracking.css'
import { formatTimeTracking, getFormatTime } from "../../../utilsFunctions/generalFuntions"
import ListUsersAddedToTrackingTime from "./listUserAddedToTrakingTime/ListUsersAddedToTrackingTime"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useCreateTrackingToTaskMutation, useDeleteTrackingMutation, useUpdateTrackingMutation } from "../../../rtkQuery/apiSliceTracking"
import { updateTask } from "../../../redux/slices/tasksSlice"
import ReactDatePicker, { registerLocale } from "react-datepicker"
import dayjs from "dayjs"
import 'dayjs/locale/es'



// const listTabs = [
//   {
//     id:"tracking-manual",
//     name: "Manual",
//     icon:(fill, height, width)=><ManualIcon fill={fill} height={height} width={width}/>,
//     Component:() => {
//       <h1>hola mundo</h1>
//     }
//   }
// ]

import es from "date-fns/locale/es";
import { setIsLoadingDelete, setTrackingSelect } from "../../../redux/slices/trackingSlice"
registerLocale("es", es);

const DropdownTracking = (
  {
    // handleAddTime,
    task,
    idRow="",
  }
) => {

  // const [formatTime, setFormatTime] = useState('')

  const [formatTimeMinutes, setFormatTimeMinutes] = useState('')
  const [totalTimeFormat, setTotalTimeFormat] = useState('')
  const [listUsersToAddedTrackingTime, setListToAddedTrackingTime] = useState([])
  const [description, setDescription] = useState('')
  const [date, setDate]=useState("")
  const [valueInputTrackingTime, setValueInputTrackingTime] = useState('')
  const [idTrackingSelected, setIdTrackingSelected] = useState(null)

  const [isOptionCreated, setIsOptionCreated] = useState(true)

  const [timeForm, setTimeForm] = useState({
    hours: 0,
    minutes: 0,
    fullMinutes: 0
  })
  const [addTrackingTimeRequest, {isLoading: isLoadingCreate}] = useCreateTrackingToTaskMutation()
  const [updateTrackingTimeRequest, {isLoading: isLoadingUpdate}] = useUpdateTrackingMutation()
  const [deleteTrackingTimeRequest] = useDeleteTrackingMutation()

  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const indexRowMap = idRow.split(".").join("-")

  const loading = isLoadingCreate || isLoadingUpdate
  // const [tabSelected, setTabSelected] = useState("pills-manual-tab")




  const mapUsersToAddedTrackingTime = (listTraking = []) =>{
    const copyListTraking = [...listTraking]
    const objectUser = {}

    try {
      for (let i = 0; i < copyListTraking.length; i++) {
        const idUser = copyListTraking[i]?.user?.id

        if(objectUser[idUser]){

          const item = objectUser[idUser]

          const {
            user,
            ...onlyTracking
          } = copyListTraking[i]


          item.total_minutes += onlyTracking?.full_minutes
          item.trackings = [
            ...item.trackings,
            onlyTracking
          ]

        }else{

          const {
            user,
            ...onlyTracking
          } = copyListTraking[i]

          const item = {
            ...user,
            total_minutes : onlyTracking?.full_minutes || 0,
            trackings : [
              onlyTracking
            ]
          }

          objectUser[idUser] = item
        }
      }
    } catch (error) {
      console.log(error)
    }

    return Object.values(objectUser)
  }

  const handleChangeDateTrackingTime = (date) =>{
    try {
      const dateObject = new Date(date)
      const formatDate = dayjs(dateObject).format("MM-DD-YYYY")
      setDate(formatDate)
    } catch (error) {
      console.log(error)
      setDate("")
    }
  }


  const validateForm = () => {
    return (timeForm.fullMinutes > 0)
  }

  const isUserAssignedToTheTask = (assignedUsers = [], userId)=>{
    return assignedUsers.some(item => item.id === userId)
  }

  const addTrackingTimeToTask = (newTrackingTime) => {
    if(Array.isArray(task?.list_tracking)){

      const newTask = {
        ...task,
        list_tracking : [
          ...task.list_tracking,
          newTrackingTime
        ]
      }
      // updateRowInListTasks(newTask)
      return newTask
    }
    return task
  }

  const updateTrackingTimeToTask = (updatedTracking) =>{

    if(Array.isArray(task?.list_tracking)){

      const updatedTask = {
        ...task,
        list_tracking : task.list_tracking.map(item => item.id === updatedTracking.id ? updatedTracking : item)
      }
      return updatedTask
    }

    return task
  }

  const deleteTrackingTimeToTask = (idTracking) =>{
    if(Array.isArray(task?.list_tracking)){
      const updatedTask = {
        ...task,
        list_tracking : task.list_tracking.filter(item => item.id !== idTracking)
      }
      return updatedTask
    }
    return task
  }

  const handleSubmit = async () => {
    try {
      if(!validateForm()) return

      if(!isUserAssignedToTheTask(task.assigned_users, user.id)){
        toast.error("No estas asignado a esta tarea", { icon: "😕" })
      }
      const body = {
        full_minutes: timeForm.fullMinutes,
        description,
        user_id: user.id,
        hours:timeForm.hours,
        minutes:timeForm.minutes,
        date: date
      }

      if(!idTrackingSelected && isOptionCreated){


        const request = await addTrackingTimeRequest({taskId: task.id, body}).unwrap()
        if(request.code === 200){
          const data = request.response

          const taskUpdated = addTrackingTimeToTask(data)
          dispatch(updateTask({id: task.id, task: taskUpdated}))

          cleanData()

          toast.success("Se agregó el tiempo!", { icon: "😃" })
        }else{
          toast.error("Upss! ocurrió un error", { icon: "😕" })
        }
      }else{

        const request = await updateTrackingTimeRequest({taskId: task.id, body, trackingId: idTrackingSelected}).unwrap()
        if(request.code === 200){
          const data = request.response
          const taskUpdated = updateTrackingTimeToTask(data)
          dispatch(updateTask({id: task.id, task: taskUpdated}))

          toast.success("Se actualizó el tiempo!", { icon: "😃" })
        }else{
          toast.error("Upss! ocurrió un error", { icon: "😕" })
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  const cleanData = () => {
    setDescription("")
    setFormatTimeMinutes("")
    setIdTrackingSelected(null)
    // setValueInput("")
    setValueInputTrackingTime("")
    setTimeForm({
      hours: 0,
      minutes: 0,
      fullMinutes: 0,
    })
    setIsOptionCreated(true)
    setDate(null)
  }

  const formatTimeToString = ({ dias, horas, minutos }) => {
    let result = ''

    if (dias > 0) {
      result += `${dias} ${dias === 1 ? 'día' : 'días'}`
    }

    if (horas > 0) {
      result += result.length > 0 ? ' y ' : ''
      result += `${horas} ${horas === 1 ? 'hora' : 'horas'}`
    }

    if (minutos > 0) {
      result += result.length > 0 ? ' y ' : ''
      result += `${minutos} ${minutos === 1 ? 'minuto' : 'minutos'}`
    }

    return result
  }

  const parseTimeStringToMinutes = useCallback((timeString) => {
    const regex = /(\d+)\s*(día|dia|hora|minuto|días|dias|horas|minutos)?/g
    let match
    let totalMinutes = 0
    let isError =  false

    while ((match = regex.exec(timeString)) !== null) {
      const value = parseInt(match[1])
      const unit = (match[2] || '').toLowerCase()
      isError = false
      switch (unit) {
        case 'día':
        case 'días':
        case 'dia':
        case 'dias':
          totalMinutes += value * 8 * 60 // 1 día = 8 horas
          break;
        case 'hora':
        case 'horas':
        case 'h':
          totalMinutes += value * 60 // 1 hora = 60 minutos
          break;
        case 'minuto':
        case 'minutos':
        case 'm':
          totalMinutes += value
          break;
        default:
          totalMinutes = 0
          isError = true
          break;
      }
    }

    return {
      totalMinutes,
      isError
    }
  }, [])

  const handleDeleteTrackingTimeRequest = async (tracking) =>{
    try {
      dispatch(setTrackingSelect(tracking))
      dispatch(setIsLoadingDelete(true))
      const request = await deleteTrackingTimeRequest(tracking.id).unwrap()
      if(request.code === 200){
        const taskUpdated = deleteTrackingTimeToTask(tracking.id)
        dispatch(updateTask({id: task.id, task: taskUpdated}))
        toast.success("Se eliminó el tiempo!", { icon: "😃" })
      }else{
        toast.error("Upss! ocur   un error", { icon: "😕" })
      }
    } catch (error) {
      console.log(error)
      toast.error("Upss! ocur   un error", { icon: "😕" })
    }finally{
      dispatch(setIsLoadingDelete(false))
      dispatch(setTrackingSelect(null))
    }
  }

  const handleClickRow = (tracking) =>{
    if(!idTrackingSelected || idTrackingSelected !== tracking.id){
      setDescription(tracking?.description || '')
      const {
        minutes,
        hours
      } = formatTimeTracking(tracking.full_minutes)

      const timeString = formatTimeToString({horas: hours, minutos: minutes})
      setValueInputTrackingTime(timeString)
      handleChangeManualTrackingTime(timeString)
      setIsOptionCreated(false)
      setIdTrackingSelected(tracking.id)
      setDate(tracking.date)
    }else{
      cleanData()
    }
  }

  const handleChangeManualTrackingTime = useCallback((inputValue) => {
    try {
      const {
        totalMinutes
      } = parseTimeStringToMinutes(inputValue)

      let formtattedTime = ''

      const formatTime = formatTimeTracking(totalMinutes)
      if(formatTime.hours > 0){
        formtattedTime += `${formatTime.hours}h `
      }

      if(formatTime.minutes > 0){
        formtattedTime += `${formatTime.minutes}m `
      }

      setFormatTimeMinutes(formtattedTime)
      setTimeForm({
        ...timeForm,
        fullMinutes : totalMinutes,
        hours : formatTime.hours,
        minutes : formatTime.minutes
      })
    } catch (error) {
      console.log(error)
    }
  }, [parseTimeStringToMinutes, timeForm])

  useEffect(()=>{
    if(task){
      const listTraking = task.list_tracking || []
      const totalMinutes = listTraking.reduce((acc, item)=>acc += item.full_minutes,0)
      const time = formatTimeTracking(totalMinutes)
      const listUsers = mapUsersToAddedTrackingTime(listTraking)
      setListToAddedTrackingTime(listUsers)
      // console.log({listUsersToAddedTrackingTime})

      setTotalTimeFormat(getFormatTime(time))
    }
  },[task])

  return (
    <div className="dropdown d-flex align-items-center dropdown-option-task-container">
      <a
        href={`#addTimeToTask-${indexRowMap}`}
        type="button"
        role="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        data-bs-auto-close="outside"
      >
        {totalTimeFormat ? (
          <span className="font-size-10-12">{totalTimeFormat}</span>
        ) : (
          <span className="feature-add-new-tag d-flex align-items-center text-center">
            <MoreTimeIcon fill="var(--gray-600)" height="24" width="24" />
          </span>
        )}
      </a>
      <ul
        className="dropdown-menu border-0 shadow py-0"
        style={{ minHeight: 100, width: 400 }}
        id={`addTimeToTask-${indexRowMap}`}
      >
        <div className="font-size-12-14">
          <div className="d-flex justify-content-between px-3 font-weight-600 my-3">
            <span className="">{task.title.toUpperCase()}</span>
            <span>{totalTimeFormat}</span>
          </div>

          <ListUsersAddedToTrackingTime
            listUsers={listUsersToAddedTrackingTime}
            onClickDelete={handleDeleteTrackingTimeRequest}
            onClickRow={handleClickRow}
            idTrackingSelected={idTrackingSelected}
          />

          <div className="tracking-content pb-4">
            <ul className="nav nav-pills mb-3" id={`pills-tab-${indexRowMap}`} role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id={`pills-manual-tab-${indexRowMap}`}
                  data-bs-toggle="pill"
                  data-bs-target={`#pills-manual-${indexRowMap}`}
                  type="button"
                  role="tab"
                  aria-controls={`pills-manual-${indexRowMap}`}
                  aria-selected="true"
                >
                  <ManualIcon className="me-2" fill="rgba(255, 255, 255, 1)" width="16" height="16"/>
                  Manual
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link"
                  id={`pills-description-tab-${indexRowMap}`}
                  data-bs-toggle="pill"
                  data-bs-target={`#pills-description-${indexRowMap}`}
                  type="button"
                  role="tab"
                  aria-controls={`pills-description-${indexRowMap}`}
                  aria-selected="false"
                >
                  <DescriptionIcon className="me-2" fill="rgba(255, 255, 255, 1)" width="16" height="16"/>
                  Descripción
                </button>
              </li>

            </ul>
            <div className="tab-content px-3" id={`pills-tabContent-${indexRowMap}`}>
              <div
                className="tab-pane fade show active"
                id={`pills-manual-${indexRowMap}`}
                role="tabpanel"
                aria-labelledby={`pills-manual-tab-${indexRowMap}`}
                tabIndex="0"
              >
                <ManualTracking
                  onChange={handleChangeManualTrackingTime}
                  defaultValue={valueInputTrackingTime}
                  // valueInput={valueInput}
                  // setValueInput={setValueInput}
                />

                  <div className="d-flex justify-content-end">
                {

                    formatTimeMinutes ? (

                    <span className="fw-bold white-color font-size-12-14">
                      {formatTimeMinutes}
                    </span>
                  ): (
                    ""
                  )
                }
                  </div>
              </div>
              <div
                className="tab-pane fade"
                id={`pills-description-${indexRowMap}`}
                role="tabpanel"
                aria-labelledby={`pills-description-tab-${indexRowMap}`}
                tabIndex="0"
              >
                <div className="container-description-tracking">
                  <textarea
                    name="description"
                    style={
                      {
                        height: "auto",
                        border: "1px solid var(--purple)",
                        maxHeight:240
                      }
                    }
                    onChange={(e)=>setDescription(e.target.value)}
                    value={description}
                    className="form-control custom-text-area font-size-10-12"

                    // id={`floatingDescription-${indexRowMap}`}
                    // rows="3"
                    placeholder="Escribir descripción..."
                  ></textarea>
                  {/* <label htmlFor={`floatingDescription-${indexRowMap}`}>Escribir descripción..</label> */}
                </div>
              </div>

            </div>

            <div className="tracking-content-date px-3">

              <DateTracking
                onChange={handleChangeDateTrackingTime}
                value={date}
              />
            </div>
          </div>

          <div className="tracking-buttons white-color px-3 d-flex justify-content-between rounded-bottom py-2">
            <button
              type="cancel"
              onClick={cleanData}
            >
              Cancelar
            </button>
            <button
              className=""
              type="button"
              onClick={handleSubmit}
              disabled={(!validateForm() || loading)}
            >
              Guardar
            </button>
          </div>
        </div>
      </ul>
    </div>
  );
}


// eslint-disable-next-line react/display-name
export const ManualTracking = memo(({onChange, defaultValue=''}) => {
  // const [totalMinutes, setTotalMinutes] = useState(0)
  // const [isError, setIsError] = useState(false)
  const [valueInput, setValueInput] = useState('')


  const handleChange = (e) => {
    setValueInput(e.target.value)
    onChange(e.target.value)
  }



  useEffect(()=>{
    setValueInput(defaultValue)
  },[defaultValue])


  // useEffect(()=>{

  //   const {
  //     totalMinutes,
  //     isError
  //   } = parseTimeStringToMinutes(valueInput)

  //   onChange(isError, totalMinutes)

  // },[valueInput, onChange, parseTimeStringToMinutes])

  return (
    <div className="form-group position-relative manual-tracking-container font-size-10-12">
      <label className="form-label position-absolute" style={{ top: 5, left: 5 }}>
        <ScheduleIcon fill="var(--gray-600)" height="16" width="16"/>
      </label>
      <input
        type="text"
        name="time"
        className="form-control ps-4 font-size-12-14 fw-bold"
        value={valueInput}
        placeholder="Introduce el tiempo (3 horas y 30 minutos)"
        onChange={(e) => handleChange(e)}
      />
    </div>
  )
})

const DateTracking = ({onChange, value}) => {
  const [startDate, setStartDate] = useState(new Date())

  const handleChange = (date) => {
    setStartDate(date)
    onChange(date)
  }

  useEffect(()=>{
    // console.log(value) // 14/12/2023

    const parseDate = dayjs(value, "DD-MM-YYYY",true)
    const isValid = parseDate.isValid()

    const date = isValid ? new Date(parseDate.toDate()) : new Date()
    setStartDate(date)
  },[value])

  return(
    <ReactDatePicker
      selected={startDate}
      onChange={handleChange}
      customInput={<CustomInput />}
      shouldCloseOnSelect={false}
      locale={"es"}
    />
  )
}

const CustomInput = forwardRef(({ value, onClick }, ref) => {

  const date = new Date(value)
  const formatDate = dayjs(date).format("DD MMM YYYY")
  // const formatDateNow = dayjs(datyNow).format("DD/MM/YYYY")
  const isToday = date.toLocaleDateString() === new Date().toLocaleDateString()

  return (
    <React.Fragment>
      <span className="font-size-10-12 white-color me-2">
        Cuándo:
      </span>
      <button className="example-custom-input font-size-10-12 white-color" onClick={onClick} ref={ref}>

        <span style={{
          borderBottom: "1px dashed var(--white)",
        }}>
          {isToday ? "Hoy" : formatDate}
        </span>

      </button>
    </React.Fragment>
  )
})

CustomInput.displayName = "CustomInput"

export default DropdownTracking
