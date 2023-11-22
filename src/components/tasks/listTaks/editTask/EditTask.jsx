import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import './editTask.css'
import DropDowTag from "../../dropDowTag/DropDowTag";
import { TagItem } from "../../../tags/listTags/ListTags";
import { removeDuplicates } from "../../../../utilsFunctions/auth";
import { AddMemberIcon, CalendarIcon, CalendarStartAtIcon, NewTagIcon } from "../../../../utils/icons/iconsMenu";
import DropdownAddUserToTask from "../DropdownAddUserToTask";
import ListUsers from "../../../user/memers/tableUsers/ListUsers";
import CustomDatePicker from "../../../datePicker/CustomDatePicker";
import dayjs from "dayjs";
import { useUpdateTaskMutation } from "../../../../rtkQuery/apiSliceTasks";
import { toast } from "react-toastify";


const DeleteTagByTask = ({handleDeleteTag})=>{
  return (
    <button type="button" onClick={() => handleDeleteTag()}>
      x
    </button>
  )
}

const IconAddUser = () => {
  return (
    <span
      className="d-flex align-items-center text-center rounded-circle"
      style={{
        border: "1px dashed var(--purple)",
        padding:2
      }}
    >
      <AddMemberIcon fill="var(--purple)" height="25" width="25" />
    </span>
  );
};

const EditTask = ({task}) => {
  const [title, setTitle] = useState("")
  const [listTagsForAddToTask, setListTagsForAddToTask] = useState([])
  const [listUsersAssigned, setListUsersAssigned] = useState([])
  const [dueDate, setDueDate] = useState(null)
  const [startAtTask, setStartAtTask] = useState(null)
  const [timestampStartAtTask, setTimestampStartAtTask] = useState(null)
  const [timestampDueDate, setTimestampDueDate] = useState(null)
  const [calculatedTime, setCalculatedTime] = useState('')

  const [mouseIsOverDueDate, setMouseIsOverDueDate] = useState(false)
  const [mouseIsOverStartAtTask, setMouseIsOverStartAtTask] = useState(false)

  const [updateTaskRequest, { isLoading }] = useUpdateTaskMutation()


  const {
    // handleSubmit,
    setValue,
    register,
    setError,
    clearErrors,
    formState: { isValid, errors, isSubmitted},
  } = useForm()
  const [description, setDescription] = useState("")


  const handleDeleteTag = (id) =>{

    return ()=>{
      setListTagsForAddToTask([...listTagsForAddToTask.filter(item => item.id !== id)])
    }
  }

  const handleAddTag = (tag) => {
    setListTagsForAddToTask(removeDuplicates([...listTagsForAddToTask, tag], "id"))
  }

  const addUserToList = ({userId, name, isWatcher,username, email}) => {
    if(!listUsersAssigned.some(user => user.id === userId)){
      setListUsersAssigned(prevState => [...prevState, {id:userId, name, is_watcher:isWatcher, username, email}])
    }
  }

  const handleDeleteUser = (userId) => {
    setListUsersAssigned(prevState => prevState.filter(user=>user.id !== userId))
  }

  const handleChangeStartsAtTask = (date) => {
    setStartAtTask(date)
    const timeStamp = new Date(date * 1000) // pasando a milisegundos
    setTimestampStartAtTask(dayjs(timeStamp).unix())
  }

  const handleChangeDueDate = (date) => {
    setDueDate(date)
    const timeStamp = new Date(date * 1000) // pasando a milisegundos
    setTimestampDueDate(dayjs(timeStamp).unix())
  }


  const onSubmit = async () => {
    try {
      if(timestampDueDate < timestampStartAtTask){
        setError("date_task",{
          type: "manual",
          message: "La fecha de finalización debe ser mayor a la fecha de inicio",
        })
        return
      }

      if(!validateForm()) return

      const body = {
        feature_id: task.feature_id,
        title,
        description,
        due_date: timestampDueDate,
        starts_at: timestampStartAtTask,
        tags_id: listTagsForAddToTask.map(item => item.id),
        usersAssign: listUsersAssigned
      }

      const response = await updateTaskRequest({taskId: task.id, body}).unwrap()

      if (response.code === 200) {

        toast.success("Tablero creado!", { icon: "😃" })

      } else {
        toast.error("Upss! ocurrió un error", { icon: "😕" })
      }
    } catch (error) {
      toast.error("Upss! ocurrió un error", { icon: "😕" })
      console.log(error)
    }
  }

  const validateForm = ()=>{
    return (timestampDueDate && timestampStartAtTask && listUsersAssigned.length > 0)
  }

  useEffect(()=>{

    if(task){
      setValue("title", task.title)
      setValue("description", task.description)
      setTitle(task.title)
      setDescription(task.description)
      setListTagsForAddToTask([...task.tags])
      setListUsersAssigned([...task.assigned_users])
      setDueDate(task.due_date)
      setTimestampDueDate(task.due_date)

      setStartAtTask(task.starts_at)
      setTimestampStartAtTask(task.starts_at)
      setCalculatedTime(task.calculated_time)
    }

  },[setValue, task])

  useEffect(()=>{
    const textArea = document.getElementById("floatingDescription")
    if(textArea){
      // textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
    }
    // return ()=>{

    //   const textArea = document.getElementById("floatingDescription")
    //   if(textArea){
    //     textArea.style.height = 'auto';
    //   }
    // }
  },[description])

  useEffect(()=>{
    if(isSubmitted){

      if(timestampDueDate < timestampStartAtTask){
        setError("date_task",{
          type: "manual",
          message: "La fecha de finalización debe ser mayor a la fecha de inicio",
        })
      }else{
        clearErrors("date_task")
      }
    }
  },[timestampDueDate, timestampStartAtTask, isSubmitted, clearErrors, setError])

  return (
    <div className="container">

      <div className="d-flex flex-column gap-3">

        <div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-3">
              <div className="d-flex flex-column align-items-center">
                <span className="font-size-12-14 gray-color-600">Fecha de inicio</span>
                <div>
                  <CustomDatePicker setValue={handleChangeStartsAtTask} value={startAtTask}>
                    {startAtTask ? (
                      <div
                        className="position-relative"
                        onMouseEnter={() => {
                          setMouseIsOverStartAtTask(true)
                        }}
                        onMouseLeave={() => {
                          setMouseIsOverStartAtTask(false)
                        }}
                      >
                        <span
                          className="text-center fw-bold font-size-8-10 title-break-all position-relative"
                          // title={startAtTask}
                        >
                          {dayjs.unix(timestampStartAtTask).format("YYYY MMM. DD, HH:mm a") || "Sin fecha"}
                        </span>
                        {mouseIsOverStartAtTask && (
                          <span
                            style={{
                              top: 4,
                              fontSize: 6,
                              right: 0,
                              cursor: "pointer",
                            }}
                            className="position-absolute translate-middle badge rounded-pill bg-danger"
                            onClick={(e) => {
                              e.stopPropagation()
                              setStartAtTask(null)
                              setTimestampStartAtTask(null)
                            }}
                          >
                            X
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="custom-icon-border-dashed d-flex align-items-center text-center">
                        <CalendarStartAtIcon
                          fill="var(--purple)"
                          height="25"
                          width="25"
                        />
                      </span>
                    )}
                  </CustomDatePicker>
                </div>
              </div>
              <div className="d-flex flex-column align-items-center">
                <span className="font-size-12-14 gray-color-600">Fecha de fin</span>
                <div>
                  <CustomDatePicker setValue={handleChangeDueDate} value={dueDate}>
                    {dueDate ? (
                      <div
                        className="position-relative"
                        onMouseEnter={() => {
                          setMouseIsOverDueDate(true)
                        }}
                        onMouseLeave={() => {
                          setMouseIsOverDueDate(false)
                        }}
                      >
                        <span
                          className="text-center fw-bold font-size-8-10 title-break-all position-relative"
                          // title={dueDate}
                        >
                          {dayjs.unix(timestampDueDate).format("YYYY MMM. DD, HH:mm a") || "Sin fecha"}
                        </span>
                        {mouseIsOverDueDate && (
                          <span
                            style={{
                              top: 4,
                              fontSize: 6,
                              right: 0,
                              cursor: "pointer",
                            }}
                            className="position-absolute translate-middle badge rounded-pill bg-danger"
                            onClick={(e) => {
                              e.stopPropagation()
                              setTimestampDueDate(null)
                              setDueDate(null)
                            }}
                          >
                            X
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="custom-icon-border-dashed d-flex align-items-center text-center">
                        <CalendarIcon
                          fill="var(--purple)"
                          height="25"
                          width="25"
                        />
                      </span>
                    )}
                  </CustomDatePicker>
                </div>
              </div>
            </div>

            <span className="fw-bold">
                {
                  calculatedTime
                }
            </span>
          </div>
          {
            errors?.date_task && (
              <span className="font-size-10-12 text-danger">* {errors.date_task.message} *</span>
            )
          }
        </div>

        <div className="form-floating">

          <input
            type="text"
            name="title"
            style={{border: "1px solid var(--purple)"}}
            className="form-control"
            id="floatingInput"
            placeholder="title"
            value={title}
            {...register("title", {
              required: true,
              onChange: (e)=>setTitle(e.target.value),
            })}
          />
          <label htmlFor="floatingInput">Titulo</label>
        </div>

        <div className="form-floating">
          <textarea
            name="description"
            style={
              {
                height: "auto",
                border: "1px solid var(--purple)"

              }
            }
            className="form-control custom-text-area input-description-task"
            placeholder="description"
            id="floatingDescription"
            value={description}
            {...register("description", {
              required: false,
              onChange: (e)=>setDescription(e.target.value),
              value:description
             })}
          >

          </textarea>
          <label htmlFor="floatingDescription">Descripción</label>
        </div>

        <div className="d-flex flex-column gap-2">
          <div className="d-flex flex-wrap justify-content-between">
            <span className="font-size-12-14 gray-color-600">Tags</span>
            <DropDowTag
              handleClickTag={handleAddTag}
              Icon={
              <span
                className="d-flex align-items-center text-center rounded-circle"
                style={{
                  border: "1px dashed var(--purple)",
                  padding:2
                }}
              >
                <NewTagIcon fill="var(--purple)" height="25" width="25" />
              </span>
              }
            />

          </div>
          <ul className="d-flex flex-row flex-wrap gap-2 list-unstyled">
            {listTagsForAddToTask.map((item) => (
              <TagItem
                key={item.id}
                tag={item.tag}
                id={item.id}
                color={item.color}
                DeleteComponent={
                  <DeleteTagByTask handleDeleteTag={handleDeleteTag(item.id)} />
                }
              />
            ))}
          </ul>
        </div>

        <section className="users-assigned-to-task">
          <div className="d-flex flex-grap justify-content-between mb-3">
            <span className="font-size-12-14 gray-color-600">Listado de usuarios asignados</span>
              {
                task && (
                  <ul className="lis-unstyled">
                    <DropdownAddUserToTask
                      Icon={<IconAddUser/>}
                      usersAddedToTheWorkspace={task?.list_of_users_added_to_the_workspace}
                      usersAssigned={listUsersAssigned}
                      taskId={task.id}
                      handleDeleteUser={handleDeleteUser}
                      handleSelectUser={addUserToList}
                    />
                  </ul>
                )
              }
          </div>
          <ListUsers
            list={listUsersAssigned}
            handleDeleteUser = {handleDeleteUser}
          />
        </section>

        <div className="d-flex justify-content-center justify-content-md-end gap-2">
          <button
            style={{
              backgroundColor: "var(--gray-600)",
              color: "var(--white)"
            }}
            className="px-2 py-1 rounded" type="cancel">
            Cancelar
          </button>
          <button
            onClick={onSubmit}
              style={{
                backgroundColor: "var(--purple)",
                color: "var(--white)"
              }}
              className="new-task-button font-size-14-16 px-4 py-1 rounded custom-button-disabled"
              // onClick={handleCreateTask}
              disabled={(!validateForm() || !isValid || isLoading)}
            >
              Guardar
            </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
