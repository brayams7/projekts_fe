import { createColumnHelper } from '@tanstack/react-table';
import TableTask from './TableTask';
import DropdowActionRow from './DropdowActionRow';
import './style.css'
// import { useListTasksOfFeatureQuery } from '../../../rtkQuery/apiSliceTasks';
import { TaskListLoader } from '../../utilsComponents/MySkeleton';
// import { useEffect, useState } from 'react';
import ColumnUsersAssignedToTask from '../columUsersAssignedToTask/ColumnUsersAssignedToTask';
import ColumnTagsUser from '../columnTagsUser/ColumnTagsUser';
import dayjs from 'dayjs';
// import { getSubtasksOfTask } from '../../../services/tasksService';
import { useModal } from '../../../hooks/modal/useSimpleModal';
import { useListTasks } from '../../../hooks/tasks/useListTasks';


const columnHelper = createColumnHelper()

const ListsTasks = ({feature}) => {
  const {isOpen, onOpen, onClose } = useModal()
    const {
      listTasks,
      selectedTask,
      // setListTask,
      setSelectedTask,
      setSelectedParent,
      selectedTaskParent,
      isLoading,
      isError,
      // currentData,
      isRowLoading,
      handleClickRow
    } = useListTasks({feature})
  // const [rowIdExpanded, setRowIdExpanded] = useState(null)

  const handleCloseModal = ()=>{
    onClose()
    setSelectedTask(null)
    setSelectedParent(null)
  }


  const columns = [
    columnHelper.accessor("select",{
      header:({table})=>{
        return (
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={table.getIsAllRowsSelected()}
              onChange={(value)=>{
                table.toggleAllPageRowsSelected(!!value)
              }}
              // id="flexCheckIndeterminate"
            />
          </div>
        );

      },
      cell:({row})=>{
        const original = row.original
        const id = original.id
        // console.log()
        const handleClick = async ()=>{

          if(!isRowLoading[id]){
            if(!row.getIsExpanded()){
              await handleClickRow({id, row})
            }
            row.getToggleExpandedHandler()(!row.getIsExpanded())

          }

        }
        if(isRowLoading[id]){
          return (
            <div
              style={{ paddingLeft: `${row.depth * 2}rem` }}
              className="d-flex align-items-center"
            >
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={row.getIsSelected()}
                  value={row.getIsSelected()}
                  onChange={() => {
                    row.toggleSelected(!row.getIsSelected());
                  }}
                  id={id}
                />
              </div>{" "}
              <span>🔄</span>
            </div>
          );
        }

        return (
          <div
            style={{ paddingLeft: `${row.depth * 2}rem` }}
            className='d-flex align-items-center'
          >
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={row.getIsSelected()}
                value={row.getIsSelected()}
                onChange={() => {
                  row.toggleSelected(!row.getIsSelected());
                }}
                id={id}
              />
            </div>{" "}
            {original.count_children >0 ? (
              <button
                {...{
                  onClick: handleClick,
                  style: { cursor: "pointer" },
                }}
              >
                {row.getIsExpanded() ? "👇" : "👉"}
              </button>
            ) : (
              " "
            )}
          </div>
        );
      }
    }),

    columnHelper.accessor("assigned_users",{
      cell:({row})=>{
        const original = row.original
        return (
          <ColumnUsersAssignedToTask
            taskId={original.id}
            assignedUsers={original.assigned_users}
            usersAddedToTheWorkspace={original.list_of_users_added_to_the_workspace}
          />
        )
      },
      enableColumnFilter:true,
      filterFn:(row, columnId, value)=>{
        if(!value || value === "all"){
          return true
        }
        const usersAssigned = row.getValue(columnId)
        return Array.isArray(usersAssigned) ? usersAssigned.some(user=>user.id === value) : false
      }
    }),

    columnHelper.accessor("title",{
      cell:(info)=><span
        className='font-size-12-14 title-break-all'
        style={{maxWidth:350}}
        title={info.getValue()}
        >{info.getValue()}</span>,
      header:"title",
      enableColumnFilter:true,
      filterFn:"includesString"
    }),

    columnHelper.accessor("starts_at",{
      cell:({row})=>{
        const original = row.original

        const startsAt = original.starts_at ? dayjs.unix(original.starts_at) : ""

        const format = startsAt ? startsAt.format("MMM. DD") : ""

        return <span className='font-size-10-12' title='Fecha de inicio'>{ format }</span>
      },
      header:"fecha de inicio"
    }),

    columnHelper.accessor("due_date",{
      cell:({row})=>{
        const original = row.original

        const startsAt = original.due_date ? dayjs.unix(original.due_date) : ""

        const format = startsAt ? startsAt.format("MMM. DD") : ""

        return <span className='font-size-10-12' title='Fecha de fin'>{ format }</span>
      },
      header:"fecha de fin"
    }),

    columnHelper.accessor("tags",{
      cell:({row})=>{
        const original = row.original
        return (
          <ColumnTagsUser
            tags={original.tags}
          />
        )
      }
    }),

    columnHelper.accessor("actions",{
      id:"actions",
      cell:({row})=>{
        const original = row.original

        return (
          <DropdowActionRow
            taskId={original.id}
            setSelectedTask={setSelectedTask}
            setSelectedParent={setSelectedParent}
            row={row}
            onOpen={onOpen}
          />
        )
      }
    })
  ]



  if(isLoading){
    <div className='w-100'>
      <TaskListLoader

      />
    </div>
  }

  if(isError){
    <div>Ocurrio un error.</div>
  }


  return (

    <div className='w-100'>

      <div className="d-flex justify-space-beetwen font-size-14-16 list-tasks-filter-member mb-2 mx-2">
        <div className='me-auto gray-color-600'>
          <span className='font-size-18-20 me-3'>Pendiente</span>
        </div>
      </div>
      <TableTask
        columns={columns}
        data={listTasks}
        // setListTasks={setListTask}
        feature={feature}
        onCloseModal={handleCloseModal}
        selectedTask={selectedTask}
        selectedTaskParent={selectedTaskParent}
        isOpenModal={isOpen}
      />
    </div>
  );
}


// const TableInstance = ({
//   tableData,
//   onClickRow,
//   isRowLoading
// }) => {


//   return (
//     <TableTask

//     />
//   )
// }

export default ListsTasks;
