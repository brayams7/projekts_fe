import { useEffect, useState } from "react";
import {
  CalendarIcon,
  CalendarStartAtIcon,
} from "../../../utils/icons/iconsMenu";
import "./newTask.css";
import { useCreateTaskMutation } from "../../../rtkQuery/apiSliceTasks";
import { toast } from "react-toastify";
import { TagItem } from "../../tags/listTags/ListTags";
import { removeDuplicates } from "../../../utilsFunctions/auth";
import CustomDatePicker from "../../datePicker/CustomDatePicker";
import ListUsersAssignedToTask from "../listUsersAsignedToTask/ListUsersAssignedToTask";
import dayjs from "dayjs";
import DropDowTag from "../dropDowTag/DropDowTag";

const DeleteTagByTask = ({handleDeleteTag})=>{
  return (
    <button type="button" onClick={() => handleDeleteTag()}>
      x
    </button>
  )
}

const NewTask = ({ feature }) => {
  const [isFocusText, setIsFocusText] = useState("")

  const [listTagsForAddToTask, setListTagsForAddToTask] = useState([])

  const [title, setTitle] = useState("")

  const [dueDate, setDueDate] = useState(null)
  const [startAtTask, setStartAtTask] = useState(null)

  const [formatDueDate, setFormatDueDate] = useState("")
  const [formatStartAtTask, setFormatStartAtTask] = useState("")

  const [timestampDueDate, setTimestampDueDate] = useState(null)
  const [timestampStartAtTask, setTimestampStartAtTask] = useState(null)

  const [mouseIsOverDueDate, setMouseIsOverDueDate] = useState(false)
  const [mouseIsOverStartAtTask, setMouseIsOverStartAtTask] = useState(false)

  const [listUsersAssigned, setListUsersAssigned] = useState([])

  const [createTaskRequest, { isLoading }] = useCreateTaskMutation()

  const handleCreateTask = async () => {
    try {
      if(!validateForm()) return

      const body = {
        feature_id: feature.id,
        title,
        due_date: timestampDueDate,
        starts_at: timestampStartAtTask,
        tags_id: listTagsForAddToTask.map(item => item.id),
        usersAssign: listUsersAssigned
      }

      const response = await createTaskRequest(body).unwrap()
      if (response.code === 200) {

        resetData()
        toast.success("Tablero creado!", { icon: "😃" })

      } else {
        toast.error("Upss! ocurrió un error", { icon: "😕" })
      }
    } catch (error) {
      toast.error("Upss! ocurrió un error", { icon: "😕" })
      console.log(error)
    }
  }

  const handleAddTag = (tag) => {
    setListTagsForAddToTask(removeDuplicates([...listTagsForAddToTask, tag], "id"))
  }

  const handleDeleteTag = (id) =>{

    return ()=>{
      setListTagsForAddToTask([...listTagsForAddToTask.filter(item => item.id !== id)])
    }
  }

  const validateForm = ()=>{
    return (title && timestampDueDate && timestampStartAtTask && listUsersAssigned.length > 0)
  }


  const resetData = () => {
    setTitle("")
    setListUsersAssigned([])
    setListTagsForAddToTask([])
    setTimestampStartAtTask(null)
    setTimestampDueDate(null)
    setFormatDueDate("")
    setFormatStartAtTask("")
  }


  useEffect(()=>{

    if(dueDate){
      const timestampDueDate = new Date(dueDate * 1000)
      setFormatDueDate(dayjs(timestampDueDate).format("MMM. DD, HH:mm a"))
      setTimestampDueDate(dayjs(timestampDueDate).unix())
    }
    if(startAtTask){
      const timestampStartAt = new Date(startAtTask * 1000)
      setFormatStartAtTask(dayjs(timestampStartAt).format("MMM. DD, HH:mm a"))
      setTimestampStartAtTask(dayjs(timestampStartAt).unix())
    }

  },[dueDate,startAtTask])


  return (
    <div className="d-flex flex-column gap-2">
      <div className="d-flex gap-3 new-task-container mb-2">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={`${
            isFocusText ? "w-75" : "w-100"
          } new-task-input rounded px-2`}
          placeholder="Escribe el nombre de la tarea"
          onFocus={() => setIsFocusText(true)}
        />
        {isFocusText && (
          <div className="d-flex gap-2 align-items-center">

            <DropDowTag
              handleClickTag={handleAddTag}
            />

            <div className="d-flex align-items-center">
              <CustomDatePicker setValue={setStartAtTask} value={startAtTask}>
                {formatStartAtTask ? (
                  <div
                    className="position-relative py-1"
                    onMouseEnter={() => {
                      setMouseIsOverStartAtTask(true)
                    }}
                    onMouseLeave={() => {
                      setMouseIsOverStartAtTask(false)
                    }}
                  >
                    <span
                      className="text-center fw-bold font-size-8-10 title-break-all position-relative"
                      title={formatStartAtTask}
                    >
                      {formatStartAtTask}
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
                          setFormatStartAtTask("")
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
                      fill="var(--gray-600)"
                      height="25"
                      width="25"
                    />
                  </span>
                )}
              </CustomDatePicker>
            </div>

            <div className="d-flex align-items-center">
              <CustomDatePicker setValue={setDueDate} value={dueDate}>
                {formatDueDate ? (
                  <div
                    className="position-relative py-1"
                    onMouseEnter={() => {
                      setMouseIsOverDueDate(true);
                    }}
                    onMouseLeave={() => {
                      setMouseIsOverDueDate(false);
                    }}
                  >
                    <span
                      className="text-center fw-bold font-size-8-10 title-break-all position-relative"
                      title={formatDueDate}
                    >
                      {formatDueDate}
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
                          e.stopPropagation();
                          setFormatDueDate("")
                          setTimestampDueDate(null)
                        }}
                      >
                        X
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="custom-icon-border-dashed d-flex align-items-center text-center">
                    <CalendarIcon
                      fill="var(--gray-600)"
                      height="25"
                      width="25"
                    />
                  </span>
                )}
              </CustomDatePicker>
            </div>

            <ListUsersAssignedToTask
              usersAssigned={listUsersAssigned}
              usersAddedToTheWorkspace={
                feature.list_of_users_added_to_the_workspace
              }
              taskId={feature.board_id}
              setListUsersAssigned={setListUsersAssigned}
              isEditable={true}
            />

            <button
              className="new-task-button font-size-10-12 px-2 py-1 rounded custom-button-disabled"
              onClick={handleCreateTask}
              disabled={isLoading || !validateForm()}
            >
              GUARDAR
            </button>
          </div>
        )}
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
  );
};

export default NewTask;
