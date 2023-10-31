import { createColumnHelper } from '@tanstack/react-table';
import TableTask from './TableTask';
import DropdowActionRow from './DropdowActionRow';
import './style.css'
import { useListTasksOfFeatureQuery } from '../../../rtkQuery/apiSliceTasks';
import { TaskListLoader } from '../../utilsComponents/MySkeleton';
import { useEffect, useState } from 'react';
import ColumnUsersAssignedToTask from '../columUsersAssignedToTask/ColumnUsersAssignedToTask';
import ColumnTagsUser from '../columnTagsUser/ColumnTagsUser';
import dayjs from 'dayjs';

const columnHelper = createColumnHelper()

// const data = [

//   {
//     id:1,
//     title:"Task 1",
//     memebers:[
//       {
//         id:1,
//         name:"Brayck",
//         profile_url:null
//       },
//       {
//         id:2,
//         name:"Gaby L",
//         profile_url:null
//       }
//     ],
//     description:"Esta es una descripcion"
//   },
//   {
//     id:2,
//     title:"Task 2",
//     memebers:[],
//     description:"Esta es una descripcion"
//   },
//   {
//     id:3,
//     title:"Task 3",
//     memebers:[],
//     description:"Esta es una descripcion"
//   }
// ]

const ListsTasks = ({feature}) => {
  const [listTasks, setListTask] = useState([])
  const {
    isLoading,
    isError,
    data,
    currentData
  } = useListTasksOfFeatureQuery(feature?.id)

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
        return(
          <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={row.getIsSelected()}
            value={row.getIsSelected()}
            onChange={()=>{
              row.toggleSelected(!row.getIsSelected())
            }}
            id={id}
          />
        </div>
        )
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
      }
    }),

    columnHelper.accessor("title",{
      cell:(info)=><span
        className='font-size-12-14 title-break-all'
        style={{maxWidth:350}}
        title={info.getValue()}
        >{info.getValue()}</span>,
      header:"title"
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
          <DropdowActionRow taskId={original.id}/>
        )
      }
    })
  ]

  if(isLoading && !currentData){
    <div className='w-100'>
      <TaskListLoader

      />
    </div>
  }

  if(isError){
    <div>Ocurrio un error.</div>
  }


  useEffect(()=>{
    if(Array.isArray(data)){

      const mapDataTask = data.map(task=>({
        ...task,
        list_of_users_added_to_the_workspace:feature.list_of_users_added_to_the_workspace
      }))
      setListTask(mapDataTask)

    }
  },[data, feature])


  return (

    <div className='w-100'>
      <div className="d-flex justify-space-beetwen font-size-14-16 list-tasks-filter-member mb-2 mx-2">
        <div className='me-auto gray-color-600'>
          <span className='font-size-18-20 me-3'>Pendiente</span>
        </div>

        <div className="ms-auto gray-color-600">
          <span className='mx-3' role='button'>Todos</span>
          <span role='button'>Mío</span>
        </div>
      </div>
      <TableTask
        columns={columns}
        data={listTasks}
        feature={feature}
      />
    </div>
  );
};

export default ListsTasks;
