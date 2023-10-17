import { useState } from "react";
import { AddMemberIcon, CalendarIcon, NewTagIcon } from "../../../utils/icons/iconsMenu";
import "./newTask.css";
import { useCreateTaskMutation } from "../../../rtkQuery/apiSliceTasks";
import { toast } from "react-toastify";
import ListTags from "../../tags/listTags/ListTags";

const NewTask = ({feature}) => {
  const [isFocusText, setIsFocusText] = useState("")
  const [title, setTitle] = useState("")
  const [createTaskRequest, {isLoading}] = useCreateTaskMutation()


  const handleCreateTask = async ()=>{
    try {
      const body = {
        feature_id:feature.id,
        title
      }

      const response = await createTaskRequest(body).unwrap()
      if(response.code === 200){
        setTitle("")
        toast.success("Tablero creado!",{icon:"😃"})

      }else{
        toast.error("Upss! ocurrió un error",{icon:"😕"})
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="d-flex gap-3 new-task-container mb-2">
      <input
        type="text"
        name="title"
        value={title}
        onChange={e=>setTitle(e.target.value)}
        className={`${isFocusText ? "w-75" : "w-100"} new-task-input rounded px-2`}
        placeholder="Escribe el nombre de la tarea"
        onFocus={() => setIsFocusText(true)}
      />
      {isFocusText && (
        <div className="d-flex gap-2">
          <div className="dropdown">
            <a
              href={`#addTagOption`}
              type="button"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <span className="custom-icon-border-dashed feature-add-new-tag d-block text-center">
                <NewTagIcon fill="var(--gray-600)" height="20" width="20" />
              </span>
            </a>
            <ul
              className="dropdown-menu border-0 shadow px-3 py-2"
              style={{height:100, width:250}}
              id="addTagOption"
            >
              <ListTags

              />
            </ul>
          </div>
          <div className="dropdown">
            <a
              href={`#addDueDateTask`}
              type="button"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <span className="custom-icon-border-dashed d-block text-center">
                <CalendarIcon fill="var(--gray-600)" height="20" width="20" />
              </span>
            </a>
            <ul
              className="dropdown-menu p-2 custom-dropdown-card"
              id="addDueDateTask"
            >
              <span>
                hola mundo
              </span>
            </ul>
          </div>

          <div className="dropdown">
            <a
              href={`#addDueDateTask`}
              type="button"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              data-bs-auto-close="outside"
            >
              <span className="custom-icon-border-dashed d-block text-center">
                <AddMemberIcon fill="var(--gray-600)" height="20" width="20" />
              </span>
            </a>
            <ul
              className="dropdown-menu p-2 custom-dropdown-card"
              id="addDueDateTask"
            >
              <span>
                hola mundo
              </span>
            </ul>
          </div>

          <button
            className="new-task-button font-size-12-14 px-2 rounded"
            onClick={handleCreateTask}
            disabled={isLoading}
          >
            GUARDAR
          </button>
        </div>
      )}
    </div>
  );
};

export default NewTask;
